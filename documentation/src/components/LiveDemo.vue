<script setup>
import { Sandpack } from "sandpack-vue3";

const props = defineProps(["demoFile"]);

const files = {
  "/index.js": props.demoFile,
};

const customSetup = {
  dependencies: {
    effector: 'latest'
  },
};

const options = {
  showConsole: true,
};

</script>

<template>
  <Sandpack template="vanilla" theme="auto" :files="files" :customSetup="customSetup" :options="options" />
</template>
