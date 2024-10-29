<!-- 大数据使用虚拟列表 -->
<template>
  <div
    class="listWrap"
    ref="listRef"
    :style="{
      height: itemhieght * count + 'px',
    }"
    @scroll="handleScroll"
  >
    <!-- 虚拟区占位：始终保持所有数据的总高度，使得滚动条一直可以保持滚动 -->
    <div
      class="placeholderDom"
      :style="{ height: allListData?.length * itemhieght + 'px' }"
    ></div>
    <!-- 页面真实渲染的列表元素：根据滚动距离截取出当前需要展示的十个 -->
    <div class="contentList" :style="{ top: topVal }">
      <div
        class="item"
        v-for="item in showListData"
        :key="item"
        :style="{ height: itemhieght + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref } from "vue";

let storageList = JSON.parse(localStorage.getItem("allListData") as string);
let allListData = ref(storageList);
let itemhieght = 40;
let count = 10;
let listRef = ref();
let start = ref(0);
let end = ref(10);
let topVal = ref();

onMounted(async () => {
  if (!allListData.value || allListData.value.length === 0) {
    // const res = await axios.get("http://124.223.69.156:3300/bigData");
    // allListData.value = res.data.data;

    allListData.value = new Array(10000).fill({}).map((item, index) => {
      item = { name: `当前第${index + 1}个元素` };
      return item;
    });

    // localStorage.setItem("allListData", JSON.stringify(allListData.value));
  }
});

const showListData = computed(() => {
  return allListData.value?.slice(start.value, end.value);
});

function handleScroll() {
  const scrollTop = listRef.value.scrollTop;
  start.value = Math.floor(scrollTop / itemhieght);
  end.value = start.value + count;
  topVal.value = listRef.value.scrollTop + "px";
}
</script>

<style lang="scss" scoped>
.listWrap {
  box-sizing: border-box;
  width: 240px;
  height: 300px;
  overflow-y: auto;
  border: 1px solid #000;
  position: relative;

  .contentList {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .item {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      &:nth-child(even) {
        background: #ff8a36;
      }
      &:nth-child(odd) {
        background: #3062a4;
      }
    }
  }
}
</style>
