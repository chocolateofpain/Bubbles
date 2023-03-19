import { links } from './constants';

export function getRandomProperty (obj: { [key: string]: string}): string {
  const keys = Object.keys(obj)

  return obj[keys[Math.floor(keys.length * Math.random())]]
}

export const getRandomLink = () => links[Math.floor(links.length * Math.random())]
export const getRandomXPosition = () => Math.random() * 100
export const getRandomSize = () => Math.floor(Math.random() * 220 + 80)