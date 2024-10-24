<script setup>
import { ref, computed, onMounted, watch } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const props = defineProps({
  data: {},
  expanded: Boolean,
  label: String,
  sample: Boolean,
  showInProd: Boolean,
  slug: String,
});

const show = ref(props.expanded || false);
const loading = ref(false);

const labelToShow = computed(() => props.label || "view json data");

const dataFiltered = computed(() => {
  if (props.sample && props.data && typeof props.data.slice === "function") {
    return props.data.slice(0, 6);
  }
  return props.data;
});

const isAdmin = computed(() => {
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  return isLocalhost || props.showInProd;
});

const fetchData = () => {
  loading.value = true;
  // Add your data fetching logic here
  // When done, set loading.value = false
};

watch(
  () => props.slug,
  (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      fetchData();
    }
  }
);

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div v-if="isAdmin">
    <div v-if="data">
      <Button @click="show = !show" class="button is-small is-dark">
        <span class="icon">
          <i class="fas fa-code"></i>
        </span>
        <span>{{ labelToShow }}</span>
      </Button>
      <vue-json-pretty
        v-if="show"
        :path="'res'"
        :data="dataFiltered"
        :highlightMouseoverNode="true"
        :showDoubleQuotes="false"
        :showLength="true"
        :deep="1"
      >
      </vue-json-pretty>
    </div>
  </div>
</template>

<style scoped>
.button {
  margin-bottom: 10px;
}
</style>
