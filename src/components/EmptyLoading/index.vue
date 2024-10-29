<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="gifloading" v-show="showComp">
    <div class="animate-background">
      <div class="gifloading-header" v-if="showHead">
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
      </div>
      <div class="gifloading-body" v-if="showBody">
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
        <div class="loading-mask"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
const { type, loadingWidth, loadingHeight } = defineProps({
  type: {
    type: String,
    validator(value: string, props) {
      // The value must match one of these strings
      return ["head", "body"].includes(value);
    },
  },
  loadingWidth: { type: String, default: "100%" },
  loadingHeight: { type: String, default: "100%" },
});

const showGetter = (str: string) => () => type === undefined || type === str;
const loadingPXGetter = (str: string) => () =>
  str.match(/%/) ? str : str + "px";

let showHead = computed(showGetter("head"));
let showBody = computed(showGetter("body"));

let loadingWidthPX = computed(loadingPXGetter(loadingWidth));
let loadingHightPX = computed(loadingPXGetter(loadingHeight));

// Whether to display the component
let showComp = ref(true);
defineExpose({
  showComp,
});
</script>

<style lang="scss" scoped>
$loadingWidth: v-bind(loadingWidthPX);
$loadingHeight: v-bind(loadingHightPX);
$loadingheaderHeight: 40px;
$loadingbodyHeight: v-bind(loadingHightPX);
$loadingborderWidth: 1px;
@import "./css/gifloading.scss";
</style>
