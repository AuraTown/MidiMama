<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const inputs = ref([]);
const outputs = ref([]);
const deviceMessages = reactive({});
const midiAccess = ref(null);
const midiLogMessages = ref([]);

const requestMIDIAccess = async () => {
  try {
    midiAccess.value = await navigator.requestMIDIAccess({ sysex: true });
    updateDevices();
    midiAccess.value.onstatechange = updateDevices;
    listenAll();
  } catch (error) {
    console.error("Failed to get MIDI access:", error);
  }
};

const updateDevices = () => {
  inputs.value = Array.from(midiAccess.value.inputs.values());
  outputs.value = Array.from(midiAccess.value.outputs.values());
  outputs.value.forEach(setupOutputListener);
};

const setupOutputListener = (output) => {
  const dummyInput = {
    id: output.id,
    addEventListener: (type, callback) => {
      output._listeners = output._listeners || [];
      output._listeners.push(callback);
    },
    removeEventListener: (type, callback) => {
      output._listeners = output._listeners.filter((cb) => cb !== callback);
    },
  };

  const originalSend = output.send.bind(output);
  output.send = (data) => {
    originalSend(data);
    if (output._listeners) {
      const event = { data };
      output._listeners.forEach((callback) => callback(event));
    }
  };

  startListening(dummyInput);
};

const startListening = (input) => {
  if (deviceMessages[input.id]) {
    input.removeEventListener("midimessage", onMIDIMessage);
  }
  deviceMessages[input.id] = reactive({
    inputs: {},
    outputs: {},
    clock: null,
    channelPressure: null,
    polyPressure: {},
  });
  input.addEventListener("midimessage", (event) =>
    onMIDIMessage(
      input.id,
      event,
      input instanceof MIDIInput ? "inputs" : "outputs"
    )
  );
};

const listenAll = () => {
  inputs.value.forEach(startListening);
  outputs.value.forEach((output) => {
    if (!deviceMessages[output.id]) {
      deviceMessages[output.id] = reactive({
        inputs: {},
        outputs: {},
        clock: null,
        channelPressure: null,
        polyPressure: {},
      });
    }
    setupOutputListener(output);
  });
};

const onMIDIMessage = (deviceId, event, direction) => {
  const [status, data1, data2] = event.data;
  const command = status >> 4;
  const channel = status & 0xf;

  if (status === 0xf8) {
    deviceMessages[deviceId].clock = {
      description: "MIDI Clock",
      timestamp: Date.now(),
    };
    return;
  }

  if (command === 13) {
    deviceMessages[deviceId].channelPressure = {
      description: `Channel Pressure (Aftertouch) - Value: ${data1}`,
      timestamp: Date.now(),
      channel: channel + 1,
      messageType: "channelPressure",
    };
    return;
  }

  if (command === 10) {
    deviceMessages[deviceId].polyPressure[`note-${data1}`] = {
      description: `Polyphonic Aftertouch - Note: ${data1}, Pressure: ${data2}`,
      timestamp: Date.now(),
      channel: channel + 1,
      messageType: "polyPressure",
      noteNumber: data1,
      pressure: data2,
    };
    return;
  }

  let key;
  if (command === 9 || command === 8) {
    key = `note-${data1}`;
  } else if (command === 11 && data1 === 7) {
    key = `volume-${data1}`;
  } else {
    key = `other-${Date.now()}`;
  }

  deviceMessages[deviceId][direction][key] = {
    ...formatMessage(event),
    timestamp: Date.now(),
  };

  console.log(
    `Updated deviceMessages for ${deviceId} ${direction}:`,
    deviceMessages[deviceId][direction]
  );

  // Expire old messages
  Object.keys(deviceMessages[deviceId][direction]).forEach((msgKey) => {
    if (
      Date.now() - deviceMessages[deviceId][direction][msgKey].timestamp >
      5000
    ) {
      delete deviceMessages[deviceId][direction][msgKey];
    }
  });

  // Expire old polyphonic aftertouch messages
  Object.keys(deviceMessages[deviceId].polyPressure).forEach((noteKey) => {
    if (
      Date.now() - deviceMessages[deviceId].polyPressure[noteKey].timestamp >
      5000
    ) {
      delete deviceMessages[deviceId].polyPressure[noteKey];
    }
  });
};

const formatMessage = (message) => {
  const [status, ...data] = message.data;
  const command = status >> 4;
  const channel = status & 0xf;
  let description;
  let messageType;
  let noteNumber;

  switch (command) {
    case 8:
      description = `Note Off - Note: ${data[0]}, Velocity: ${data[1]}`;
      messageType = "noteOff";
      noteNumber = data[0];
      break;
    case 9:
      description = `Note On - Note: ${data[0]}, Velocity: ${data[1]}`;
      messageType = data[1] > 0 ? "noteOn" : "noteOff";
      noteNumber = data[0];
      break;
    case 10:
      description = `Polyphonic Aftertouch - Note: ${data[0]}, Pressure: ${data[1]}`;
      messageType = "polyPressure";
      noteNumber = data[0];
      break;
    case 11:
      if (data[0] === 7) {
        description = `Volume: ${data[1]}`;
      } else {
        description = `CC - Controller: ${data[0]}, Value: ${data[1]}`;
      }
      break;
    case 12:
      description = `Program Change - Program: ${data[0]}`;
      break;
    case 13:
      description = `Channel Pressure (Aftertouch) - Value: ${data[0]}`;
      messageType = "channelPressure";
      break;
    case 14:
      description = `Pitch Bend - Value: ${(data[1] << 7) + data[0]}`;
      messageType = "pitchBend";
      break;
    case 15:
      if (status === 0xf0) {
        description = `System Exclusive - Length: ${data.length} bytes`;
        messageType = "sysex";
      } else if (status === 0xf8) {
        description = "Timing Clock";
        messageType = "timingClock";
      } else {
        description = `System Real-Time: ${status.toString(16).toUpperCase()}`;
        messageType = "systemRealTime";
      }
      break;
    default:
      description = `Unknown - Status: ${status.toString(16).toUpperCase()}, Data: ${data.join(", ")}`;
      messageType = "unknown";
  }

  return {
    channel: channel + 1,
    noteNumber,
    description,
    messageType,
    rawData: [status, ...data],
  };
};

const logMessage = (message) => {
  console.info("🌷🌷🌷🌷🌷🌷MIDI Message:", message);
  midiLogMessages.value.unshift(message);
  if (midiLogMessages.value.length > 50) {
    midiLogMessages.value.pop();
  }
};

const handleOutputMessage = (outputId, message) => {
  console.log(`Handling output message for ${outputId}:`, message);

  // Simulate receiving the message for the output
  onMIDIMessage(outputId, { data: message }, "outputs");
  console.log(`Simulated message received for output ${outputId}`);

  // Actually send the message to the MIDI output
  const output = outputs.value.find((out) => out.id === outputId);
  if (output) {
    output.send(message);
    console.log(`Message sent to output ${outputId}`);
  } else {
    console.warn(`Output ${outputId} not found`);
  }
};

const getSortedMessages = (deviceData) => {
  let clockMessage = null;
  let channelPressureMessage = null;
  const allMessages = [];

  if (deviceData.clock && Date.now() - deviceData.clock.timestamp < 5000) {
    clockMessage = { key: "clock", ...deviceData.clock };
  }

  if (
    deviceData.channelPressure &&
    Date.now() - deviceData.channelPressure.timestamp < 5000
  ) {
    channelPressureMessage = {
      key: "channelPressure",
      ...deviceData.channelPressure,
    };
  }

  for (const direction of ["inputs", "outputs"]) {
    for (const [key, value] of Object.entries(deviceData[direction] || {})) {
      const polyPressure = deviceData.polyPressure[key];
      if (polyPressure) {
        allMessages.push({
          key,
          direction,
          ...value,
          polyPressure: polyPressure.pressure,
        });
      } else {
        allMessages.push({ key, direction, ...value });
      }
    }
  }

  allMessages.sort((a, b) => b.timestamp - a.timestamp);

  if (channelPressureMessage) {
    allMessages.unshift(channelPressureMessage);
  }

  if (clockMessage) {
    allMessages.unshift(clockMessage);
  }

  return allMessages;
};

onMounted(() => {
  requestMIDIAccess();
});

onBeforeUnmount(() => {
  inputs.value.forEach((input) => {
    if (deviceMessages[input.id]) {
      input.removeEventListener("midimessage", onMIDIMessage);
    }
  });
});
</script>

<template>
  <div class="midi-component">
    <div class="midiLogs">
      <h2 class="text-2xl font-bold mb-4">MIDI Logs</h2>
      <vue-json-pretty
        v-for="(log, index) in midiLogMessages"
        :key="index"
        :path="'res'"
        :data="log"
        :highlightMouseoverNode="true"
        :showDoubleQuotes="false"
        :showLength="true"
        :deep="1"
      />
    </div>

    <div v-for="type in ['inputs', 'outputs']" :key="type" class="midi-table">
      <h2 class="text-2xl font-bold mb-4">
        MIDI {{ type.charAt(0).toUpperCase() + type.slice(1) }}
      </h2>
      <div class="table-container">
        <div
          v-for="device in type === 'inputs' ? inputs : outputs"
          :key="device.id"
          class="device-column"
        >
          <h3 class="text-xl font-semibold mb-2">{{ device.name }}</h3>
          <div class="message-list">
            <div
              v-for="message in getSortedMessages(
                deviceMessages[device.id] || {}
              )"
              :key="message.key"
              class="message-card cursor-pointer hover:bg-gray-200"
              @click="logMessage(message)"
            >
              <span class="text-sm text-gray-500"
                >Ch {{ message.channel || "-" }}:</span
              >
              <span
                class="text-2xl font-bold mr-2"
                :class="{
                  'note-on': message.messageType === 'noteOn',
                  'note-off': message.messageType === 'noteOff',
                }"
              >
                {{ message.noteNumber || "-" }}
              </span>
              <span>{{ message.description }}</span>
              <span
                v-if="message.polyPressure !== undefined"
                class="ml-2 text-blue-600"
              >
                (Poly AT: {{ message.polyPressure }})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.midi-component {
  font-family: Arial, sans-serif;
  padding: 30px;
  margin: 0 auto;
  display: flex;
}

.midi-table {
  margin-bottom: 2em;
  flex-grow: 1;
}

.table-container {
  display: flex;
  overflow-x: auto;
}

.device-column {
  min-width: 200px;
  margin-right: 1em;
  border: 1px solid #ccc;
  padding: 1em;
}

.message-list {
  height: 300px;
  overflow-y: auto;
}

.message-card {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5em;
  margin-bottom: 0.5em;
}

.note-on {
  color: #4caf50; /* Green color for Note On */
}

.note-off {
  color: #f44336; /* Red color for Note Off */
}

.midiLogs {
  width: 300px;
  margin-left: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 60px);
}
</style>
