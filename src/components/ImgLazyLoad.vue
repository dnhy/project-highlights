<!-- 图片懒加载 -->
<template>
  <div
    v-for="(_, idx) in new Array(200).fill(0)"
    style="width: 200px; height: 200px; margin: auto; margin-bottom: 10px"
    :key="idx"
  >
    <!--https://via.placeholder.com/200-->
    <EmptyLoading
      :type="type"
      loadingWidth="200"
      loadingHeight="200"
      ref="empty"
    />

    <img
      ref="img"
      alt="b"
      style="width: 200px; height: 200px"
      :data-src="`https://picsum.photos/200/${180 + idx}`"
      @load="() => loadImage(idx)"
    />
  </div>
</template>

<script setup lang="ts">
import EmptyLoading from "@/components/EmptyLoading/index.vue";
import { ref } from "vue";
import { useImage } from "@/hooks/useImage";
import SparkMD5 from "spark-md5";

const sparkMD5 = new SparkMD5();
sparkMD5.append(new ArrayBuffer(16));
const a = sparkMD5.end();
console.log("a :", a);
let type = ref("body");
let img = ref();
let empty = ref();

// 懒加载图片
useImage(img);

function loadImage(idx: number) {
  empty.value[idx].showComp = false;
}
</script>

<style lang="scss" scoped></style>
