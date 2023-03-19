<template>
  <a
    :id="id"
    :href="link"
    target="_blank"
    ref="target"
    class="rounded-full bub"
    :style="{ 
      left: `${randomXPosition}%`,
      height: `${size}px`,
      width: `${size}px`,
      animation: `bubble ${randomAnimationDuration}s ease-in infinite`,
      '--size': `-${size}px`,
      'animation-play-state': isHovered ? 'paused' : '',
      'background-color': `${bgColor}`,
    }"
  >
  </a>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  getRandomLink,
  getRandomXPosition,
  getRandomSize,

} from '../helpers'
import { useElementHover } from '@vueuse/core'
import { backgroundColor } from '../constants';

const props = defineProps({
  id: String
})

const target = ref()

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

onMounted(() => {

  addEventListener("animationiteration", (event: AnimationEvent ) => {
    const target = event.target as HTMLAnchorElement
    if (target) updateBubble(target.id as string )
  });
})

function updateBubble (eventId: string) {
  if (eventId === props.id) {
    link.value = getRandomLink()
    randomXPosition.value = getRandomXPosition()
    size.value = getRandomSize()
    bgColor.value = backgroundColor[Math.floor(Math.random() * backgroundColor.length)]
  }
}

const randomAnimationDuration = ref(Math.floor(Math.random() * 4 + 4))

const isHovered = useElementHover(target)

const link = ref(getRandomLink())

const randomXPosition = ref(getRandomXPosition())

const size = ref(getRandomSize())

const bgColor = ref(backgroundColor[Math.floor(Math.random() * backgroundColor.length)])

</script>
<style>
.bub {
  box-shadow: inset 5px -5px 10px white;
  backdrop-filter: blur(2px);
  position: absolute;
  bottom: var(--size);
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
    opacity: 1;
  }
  100% {
    transform: translate(90px, -150vh);
  }
}
</style>

