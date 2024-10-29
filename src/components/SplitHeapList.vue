<!-- 大数据列表分堆渲染 -->
<template>
  <el-table
    height="300"
    :data="arr"
    border
    style="width: 80%"
    :header-cell-style="{
      height: '24px',
      lineHeight: '24px',
      color: '#606266',
      background: '#F5F5F5',
      fontWeight: 'bold',
    }"
  >
    <el-table-column type="index" label="序"></el-table-column>
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="name" label="名字"></el-table-column>
    <el-table-column prop="value" label="对应值"></el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

function splitData(data: object[]) {
  let res = [],
    i = 0;
  while (i < data.length) {
    res.push(data.slice(i, i + 10));
    i += 10;
  }
  return res;
}
const arr = ref([] as object[]);

onMounted(async () => {
  const res = await axios.get("http://124.223.69.156:3300/bigData");

  const resArr = splitData(res.data.data);
  useArr(resArr, 0);
});

function useArr(resArr: object[][], page: number) {
  if (page === resArr.length) {
    return;
  }
  //   渲染10个数据后再执行该回调
  requestAnimationFrame(() => {
    arr.value = [...arr.value, ...resArr[page++]];
    console.log(1111);

    useArr(resArr, page);
  });
}
</script>

<style lang="scss" scoped></style>
