<template>
  <div class="relative bg-[#fff3af] h-screen" id="observer-root">
    <Bubble 
      :size="500" 
      class="observable" 
      v-for="bubble in bubbles" 
      :key="bubble.id"
      :randomAnimationDuration="bubble.randomAnimationDuration"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Bubble from './components/Bubble.vue';

const NUMBER_OF_BUBBLES = 10

const bubbles = ref(Array.from(
  { length: NUMBER_OF_BUBBLES },
  () => {
    return { id: crypto.randomUUID(), randomAnimationDuration: Math.floor(Math.random() * 4 + 2) }
  }
))

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

  addNewBubble()
})


function addNewBubble (id = null) {
  const randomAnimationDuration = Math.floor(Math.random() * 4 + 2)
  const newId = crypto.randomUUID()
  bubbles.value.push({ id: newId , randomAnimationDuration })

  if (id) {
    console.log(id)
    bubbles.value.filter(bubble => bubble.id !== id)
  } else {
    console.log('beep')
    bubbles.value.shift()
  }


  setTimeout(addNewBubble, randomAnimationDuration * 1000, newId)
}

</script>

<style>
.in-sight {
  border: 2px solid;
  border-color: violet;
}
</style>
