<template>
  <div class="relative bg-[#fff3af] h-screen" id="observer-root">
    <Bubble :size="500" class="observable" v-for="bubble in bubbles" :key="bubble.id"/>
    <!-- <Bubble :size="500" class="observable"/>
    <Bubble :size="500" class="observable"/>
    <Bubble :size="500" class="observable"/>
    <Bubble :size="500" class="observable"/>
    <Bubble :size="500" class="observable"/> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Bubble from './components/Bubble.vue';

const myKey = ref('beep')

const bubbleCount = ref(1)
const bubbles = ref([{ id: bubbleCount.value }])

const callback = (entries: IntersectionObserverEntry[]) => {  
  entries.forEach(({ target, isIntersecting }: IntersectionObserverEntry)=> {
  if (!isIntersecting) {
    return target.classList.remove('in-sight');
  } 
    target.classList.add('in-sight');
  })
};

onMounted(() => {
  const observer = new IntersectionObserver(callback, {
      root: document.getElementById("observer-root"),
      threshold: 1.0,
  });
  document
  .querySelectorAll(".observable")
  .forEach((el) => observer.observe(el));

  setInterval(function() {
    bubbleCount.value += 1
    // bubbles.value = Array.apply(null, Array(bubbleCount.value)).map((e, i) => {
    //   return { id: i }
    // })
    bubbles.value.shift()
  }, 1000);
})

</script>

<style>
.in-sight {
  border: 2px solid;
  border-color: violet;
}
</style>
