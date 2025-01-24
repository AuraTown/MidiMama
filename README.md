# MIDI Mama (web)

MIDI Mama is a web (Vue 3) component that brings comprehensive MIDI monitoring capabilities to web applications. This project is inspired by [ShowMIDI](https://github.com/gbevin/ShowMIDI), an excellent MIDI visualization tool. Our goal is to provide similar functionality in a web context with additional debugging features.

## From Native to Web: The MIDI Mama Journey

While MIDI Mama excels at providing detailed MIDI analysis in a native application context, we've adapted these capabilities for modern web development workflows. MIDI Mama creates a bridge between traditional MIDI monitoring and contemporary web development by:

- Integrating seamlessly with Vue applications while maintaining comprehensive MIDI analysis capabilities
- Leveraging the Web MIDI API for real-time monitoring directly in the browser
- Providing a component-based architecture that simplifies MIDI monitoring integration
- Extending the concept with web-specific features like JSON-based message inspection

## Why MIDI Mama?

Web MIDI applications can be challenging to debug because MIDI messages are typically invisible to developers. MIDI Mama addresses this by providing:

- Real-time visualization of all MIDI traffic in your application
- Clear, human-readable interpretation of MIDI messages
- Support for both MIDI inputs and outputs in a single view
- Automatic handling of complex MIDI features like aftertouch and polyphonic pressure
- JSON-based visualization for easy debugging and data inspection

## Features and Capabilities

MIDI Mama provides comprehensive MIDI monitoring capabilities:

- **Device Management**: Automatic detection and display of all connected MIDI devices
- **Message Parsing**: Clear interpretation of various MIDI message types:
  - Note On/Off events with velocity
  - Control Change messages
  - Program Change
  - Pitch Bend
  - Aftertouch (both Channel and Polyphonic)
  - System messages
- **Real-time Updates**: Messages are displayed instantly as they occur
- **Message History**: Maintains a log of recent MIDI activity
- **JSON Visualization**: Complex MIDI data structures are displayed in an easy-to-read format

## Installation

You can integrate MIDI Mama into your project in several ways:

### NPM Package (Recommended)

```bash
npm install https://github.com/AuraTown/MidiMama.git
```

### Manual Download

You can also download the component directly from the GitHub repository and include it in your project.

## Usage

MIDI Mama supports multiple integration patterns to fit different development needs:

### Modern Vue Application (Composition API)

```javascript
// In your Vue component
import { MidiMama } from "MidiMama";
import "MidiMama/dist/style.css";

export default {
  components: {
    MidiMama,
  },
};
```

### Vue Single File Component

```vue
<template>
  <midi-mama />
</template>

<script setup>
import { MidiMama } from "MidiMama";
import "MidiMama/dist/style.css";
</script>
```

### Direct Browser Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="dist/MidiMama.umd.js"></script>
    <link rel="stylesheet" href="dist/style.css" />
  </head>
  <body>
    <div id="app">
      <show-midi></show-midi>
    </div>

    <script>
      const { createApp } = Vue;
      const app = createApp({});
      app.component("MidiMama", MidiMama);
      app.mount("#app");
    </script>
  </body>
</html>
```

## Development

If you'd like to contribute to MIDI Mama or customize it for your needs, here's how to set up the development environment:

```bash
# Clone the repository
git clone https://github.com/AuraTown/MidiMama.git
cd MidiMama

# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Browser Compatibility

MIDI Mama works in all modern browsers that support the Web MIDI API:

- Chrome
- Edge
- Opera
- Other Chromium-based browsers

Note: Firefox and Safari require additional configuration or extensions to support Web MIDI.

## Troubleshooting

If you encounter issues with MIDI functionality:

1. Check browser MIDI support:

```javascript
if (navigator.requestMIDIAccess) {
  console.log("Web MIDI is supported!");
}
```

2. Ensure MIDI permissions are granted in your browser settings
3. Verify your MIDI devices are properly connected and recognized by your operating system
4. Check the browser console for detailed error messages

## Roadmap

We're actively working on enhancing MIDI Mama with these planned features:

- Interactive MIDI message sending interface
- Customizable device filtering options
- Enhanced documentation with practical examples
- Simplified UI with collapsible device views
- Message type filtering capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This project stands on the shoulders of giants, particularly [ShowMIDI](https://github.com/gbevin/ShowMIDI) by Geert Bevin. ShowMIDI's elegant approach to MIDI visualization provided the inspiration and blueprint for bringing these capabilities to the web. We're grateful to Geert and the ShowMIDI team for showing what's possible in MIDI monitoring and analysis.

Additional thanks go to:

- The Web MIDI API team for enabling MIDI access in browsers
- The Vue.js community for creating a powerful framework for component development
- All contributors who help make MIDI Mama better
