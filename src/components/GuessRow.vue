<template>
    <div
      class="rounded-xl p-3 border backdrop-blur bg-white/5"
      :class="rowClass">
      <div class="flex items-center justify-between gap-3">
        <div class="min-w-0">
          <div class="font-semibold truncate">
            {{ guess.name }}
            <span v-if="guess.isCorrect" class="ml-2 text-emerald-300">✓</span>
          </div>
          <div v-if="!guess.valid" class="text-xs text-rose-300 mt-0.5">
            {{ guess.message || 'Invalid guess' }}
          </div>
          <div v-else class="text-xs text-slate-300 mt-0.5">
            {{ guess.km.toLocaleString() }} km · {{ guess.dir }}
          </div>
        </div>
        <div class="w-40">
          <div v-if="guess.valid" class="progress-track" :aria-label="`closeness ${guess.score}%`">
            <div class="progress-fill" :style="{ width: Math.max(3, guess.score) + '%' }"></div>
          </div>
          <div v-else class="text-right text-slate-500 text-xs">—</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  const props = defineProps({ guess: Object })
  
  const rowClass = computed(() => {
    if (!props.guess.valid) return 'border-rose-500/30'
    if (props.guess.isCorrect) return 'border-emerald-500/30 ring-1 ring-emerald-500/20'
    return 'border-white/10 hover:border-white/20 transition'
  })
  </script>
  