<script setup>
import { Sandpack } from "sandpack-vue3";
import effectorRaw from '../../../npm/effector/effector.mjs?raw'

const props = defineProps(["demoFile"]);

const files = {
  "/index.js": props.demoFile,
  ...localPackage({ name: "effector", content: effectorRaw }),
};

const customSetup = {
  dependencies: {

  },
};

function localPackage({ name, content }) {
  return {
    [`/node_modules/${name}/package.json`]: {
      hidden: true,
      code: JSON.stringify({
        name: `${name}`,
        main: "./index.js",
      }),
    },
    [`/node_modules/${name}/index.js`]: {
      hidden: true,
      code: content,
    },
  };
}

const options = {
  showConsole: true,
};

</script>

<template>
  <Sandpack template="vanilla" theme="auto" :files="files" :customSetup="customSetup" :options="options" />
</template>
