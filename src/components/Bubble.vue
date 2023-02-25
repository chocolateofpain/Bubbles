<template>
  <a
    :href="randomLink"
    target="_blank"
    class="rounded-full bub"
    :class="[randomBgColor]"
    ref="target"
    :style="{ 
      left: `${randomXPosition}%`,
      height: `${randomSize}px`,
      width: `${randomSize}px`,
      animation: `bubble ${randomAnimationDuration}s ease-in infinite`,
      '--bam': `${shadowSize}px`,
    }"
  >
  </a>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { links } from '../constants';

defineProps<{
  size: Number,
  randomAnimationDuration: Number,
  link: string
}>()

const bubbleIsVisible = ref(false)

function getRandomProperty (obj: { [key: string]: string}): string {
  const keys = Object.keys(obj)

  return obj[keys[Math.floor(keys.length * Math.random())]]
}

const randomLink = links[Math.floor(links.length * Math.random())]

const target = ref(null)

const rectPosition = computed(() => target.value?.getBoundingClientRect())

const testBounding = () => {
    if (!window)
      return

    const document = window.document
    const el = target
    if (!target.value) {
      bubbleIsVisible.value = false
    }
    else {
      const rect = target.value.getBoundingClientRect()
      bubbleIsVisible.value = (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
          && rect.left <= (window.innerWidth || document.documentElement.clientWidth)
          && rect.bottom >= 0
          && rect.right >= 0
      )
    }
  }

 // watch(rectPosition, (newValue) => console.log(newValue))



const backgroundColor = {
  AMBER: 'bg-amber-400',
  ORANGE: 'bg-orange-400',
  YELLOW: 'bg-yellow-400',
  TEAL: 'bg-teal-400',
  EMERALD: 'bg-emerald-400',
  GREEN: 'bg-green-400',
  CYAN: 'bg-cyan-400',
  SKY: 'bg-sky-400',
  BLUE: 'bg-blue-400',
  INDIGO: 'bg-indigo-400',
  VIOLET: 'bg-violet-400'
}

const randomXPosition = Math.random() * 100

const randomSize = Math.floor(Math.random() * 220 + 80)
const shadowSize = randomSize / 4

const randomBgColor = getRandomProperty(backgroundColor)
</script>
<style>
.bub {
  --boom: var(--bam);
  box-shadow: inset 5px -5px 10px white;
  backdrop-filter: blur(2px);
  position: absolute;
  bottom: -300px;
  /* animation: bubble 3s ease-in infinite; */
  /* animation: bubble2 2s ease-in 1s infinite; */
}
.bub::before {
  position: absolute;
  content: "";
  background-color: white;
  width: 10%;
  height: 10%;
  border-radius: 50%;
  top: 20%;
  right: 20%;
  box-shadow: 0px 0px 20px white;
}

@keyframes bubble {
  0% {
    opacity: 0;
  }
  10%,
  93% {
    opacity: 1;
  }
  100% {
    transform: translate(90px, -150vh);
    display: none;
    /* opacity: 0; */
  }
}
</style>

