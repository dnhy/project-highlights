<template>
  <div>{{ madokaObj.madoka }}</div>
</template>

<script setup lang="ts">
import { useInstance } from "@/hooks/useInstance";
import { reactive, ref } from "vue";

const {
  proxy: { $localstorage: localstorage },
} = useInstance();

localstorage?.setItem("key001", JSON.stringify({ madoka: "homura" }));

let obj = JSON.parse(localstorage?.getItem("key001") || "");
let madokaObj = reactive(obj);

// localstorage?.clear();
</script>

<style lang="scss" scoped></style>
