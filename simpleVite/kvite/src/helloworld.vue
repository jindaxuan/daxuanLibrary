<template>
    <div>
      <h1>
        {{name}}
      </h1>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
  setup() {
    const name = ref('hello, World')
    // 实时变化数值a'c's'v'z'x
    // setInterval(() => {
    //   title.value = title.value.split("").reverse().join("");
    // }, 1000);
    return{ name }
  }
};
</script>

