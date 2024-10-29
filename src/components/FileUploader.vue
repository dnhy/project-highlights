<!-- 大文件分片上传 -->
<template>
  <input type="file" ref="uploadInput" />
</template>

<script setup lang="ts">
import SparkMD5 from "spark-md5";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { onMounted, ref } from "vue";

const uploadInput = ref();

onMounted(() => {
  uploadInput.value.onchange = async (e: Event) => {
    const files = (e.target as HTMLFormElement).files;

    const file = files[0];
    console.log("file :", file);

    // 对文件切片
    const chunks = createChunks(file, 50 * 1024 * 104);
    console.log("chunks :", chunks);

    //创建文件内容的hash
    let hashCode = await hash(chunks);
    console.log("hashCode :", hashCode);

    //调用接口分片上传
    uploadChunk(chunks, hashCode, file.name);
  };
});

function createChunks(file: File, chunkSize = 50 * 1024 * 104): Blob[] {
  let result: Blob[] = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    const element = file.slice(i, i + chunkSize);
    result = result.concat(element);
  }

  return result;
}

function hash(chunks: Blob[]): Promise<string> {
  return new Promise((resolve) => {
    var spark = new SparkMD5();

    function _read(i: number) {
      if (i >= chunks.length) {
        resolve(spark.end());
        return;
      }

      let blob = chunks[i];
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);

      reader.onload = (e: ProgressEvent) => {
        var bytes = (e.target as HTMLFormElement).result as ArrayBuffer;
        spark.append(bytes);
        const buffer = new SparkMD5.ArrayBuffer();
        buffer.append(bytes);
        _read(i + 1);
      };
    }
    _read(0);
  });
}

function uploadChunk(chunks: Blob[], hashCode: string, fileName: string): void {
  const taskArr: Promise<AxiosResponse>[] = [];
  chunks.forEach((chunk, index) => {
    var formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("chunkName", `${hashCode}-${index}-${fileName}`);
    formData.append("fileName", fileName);
    //   所有分片同时调用接口上传
    var promise = axios.post("http://127.0.0.1:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    taskArr.push(promise);
  });

  //   上传完成后promise变为fullfield，所有分片都完成上传后通知后端
  Promise.all(taskArr).then(() => {
    console.log("通知后端传输完成");
  });
}
</script>

<style lang="scss" scoped></style>
