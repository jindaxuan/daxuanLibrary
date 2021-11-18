<template>
    <div>
      <h1>
        {{title}}
        <!-- <helloworld></helloworld> -->
      </h1>
    </div>
</template>

<script>
import {ref} from 'vue'
import helloworld from './helloworld.vue'
export default {
  components:{helloworld},
  setup() {
    const title = ref('hello, kvite')
    // 实时变化数值a'c's'v'z'x
    // setInterval(() => {
    //   title.value = title.value.split("").reverse().join("");
    // }, 1000);
    return{ title }
  }
};
</script>
