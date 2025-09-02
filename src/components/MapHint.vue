<template>
    <div>
      <div class="text-sm text-slate-300 mb-3">
        From <span class="font-medium text-slate-100">{{ latest.name }}</span>,
        go <span class="font-medium text-slate-100">{{ latest.dir }}</span>
        about <span class="font-medium text-slate-100">{{ latest.km.toLocaleString() }} km</span>.
      </div>
  
      <div class="relative mx-auto w-60 h-60 glass p-4">
        <svg viewBox="0 0 200 200" class="w-full h-full">
          <!-- Background gradient circle -->
          <defs>
            <radialGradient id="g" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="rgba(255,255,255,0.12)"/>
              <stop offset="100%" stop-color="rgba(255,255,255,0.02)"/>
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="88" fill="url(#g)" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  
          <!-- Cardinal labels -->
          <g font-size="10" fill="rgba(255,255,255,0.7)" text-anchor="middle" dominant-baseline="central">
            <text x="100" y="20">N</text>
            <text x="180" y="100">E</text>
            <text x="100" y="180">S</text>
            <text x="20" y="100">W</text>
          </g>
  
          <!-- Ticks -->
          <g stroke="rgba(255,255,255,0.15)">
            <template v-for="i in 36" :key="i">
              <line
                :x1="100" y1="14"
                :x2="100" :y2="i % 3 === 0 ? 24 : 18"
                :transform="`rotate(${i*10} 100 100)`" />
            </template>
          </g>
  
          <!-- Needle -->
          <g :transform="`rotate(${bearingDeg} 100 100)`" style="transition: transform 300ms ease">
            <polygon points="100,28 106,110 94,110" fill="url(#needleGrad)"/>
            <circle cx="100" cy="110" r="6" fill="rgba(255,255,255,0.8)"/>
          </g>
  
          <defs>
            <linearGradient id="needleGrad" x1="0" x2="1">
              <stop offset="0%" stop-color="#22c55e"/>
              <stop offset="100%" stop-color="#06b6d4"/>
            </linearGradient>
          </defs>
        </svg>
        <p class="text-center text-xs text-slate-400 mt-1">Arrow points toward the target.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  const props = defineProps({ latest: Object, target: Object })
  
  const compassMap = {
    N: 0, NNE: 22.5, NE: 45, ENE: 67.5, E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
    S: 180, SSW: 202.5, SW: 225, WSW: 247.5, W: 270, WNW: 292.5, NW: 315, NNW: 337.5
  }
  const bearingDeg = computed(() => compassMap[props.latest.dir] ?? 0)
  </script>
  