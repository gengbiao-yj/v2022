<template>
  <button id="btn1">操作1</button>
  <button id="btn2">操作2</button>
  <button id="btn3">操作3</button>
  <button id="btn4">操作4</button>
</template>

<script lang="ts" setup>
onMounted(() => {
  console.log(11);
});
</script>

<style lang="scss" scoped></style>

<script lang="ts">
export default {
  name: 'BaseLogin'
};
</script>
