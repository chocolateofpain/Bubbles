<template>
  <div
    class="rounded-full bub"
    :class="randomBgColor"
    :style="{ 
      left: `${randomXPosition}%`,
      height: `${randomSize}px`,
      width: `${randomSize}px`,
      // animation: `bubble ${randomAnimationDuration}s ease-in infinite`,
    }"
  />
</template>
<script setup lang="ts">
defineProps({
  size: Number,
})

function getRandomProperty (obj: { [key: string]: string}): string {
  const keys = Object.keys(obj)

  return obj[keys[Math.floor(keys.length * Math.random())]]
}

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

const randomAnimationDuration = Math.floor(Math.random() * 4 + 1)

const randomBgColor = getRandomProperty(backgroundColor)
</script>
<style scoped>
.bub {
  box-shadow: inset 5px -5px 10px white;
  backdrop-filter: blur(2px);
  position: absolute;
  bottom: -100px;
  animation: bubble 3s ease-in infinite;
  /* animation: bubble2 2s ease-in 1s infinite; */
}
.bub::before {
  position: absolute;
  content: "";
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: 25px;
  right: 23px;
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
    transform: translate(90px, -700px);
    display: none;
  }
}
</style>

