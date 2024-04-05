import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertSeconds(seconds:number) {
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;
  
  let hours = Math.floor(minutes / 60);
  minutes %= 60;
  
  const days = Math.floor(hours / 24);
  hours %= 24;
  
  return { days, hours, minutes, seconds };
}
