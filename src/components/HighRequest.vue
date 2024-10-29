<!-- 高并发处理 -->
<template>
  <div>21122121121212</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

type PromiseVoid = Promise<void>;

function request(time: number) {
  return () =>
    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        console.log(time);
        resolve();
      }, time);
    });
}
// 需要并发调用的接口
const reqArr = [
  request(1000),
  request(1000),
  request(3000),
  request(2000),
  request(1000),
];

let poolLimit = 2;

asyncPool(reqArr, poolLimit);

function asyncPool(reqArr: (() => PromiseVoid)[], poolLimit = 2) {
  let exexutingArr = [];

  const finishs: PromiseVoid[] = [];

  onMounted(async () => {
    for (const [index, f] of reqArr.entries()) {
      const res = f();
      exexutingArr.push(res);
      finishs.push(res);
      if (poolLimit > reqArr.length) continue;
      res.then(() => {
        const index = exexutingArr.indexOf(res);
        exexutingArr.splice(index, 1);
      });
      if (exexutingArr.length >= poolLimit) {
        console.log("await");
        await Promise.race(exexutingArr);
      }
    }

    Promise.all(finishs).then(() => {
      console.log("请求全部完成。。。");
    });
  });
}
</script>

<style lang="scss" scoped></style>
