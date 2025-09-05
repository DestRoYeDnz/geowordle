<template>
    <div
      class="rounded-xl p-3 border backdrop-blur bg-white/5 transition"
      :class="rowClass"
    >
      <div class="flex items-center justify-between gap-3">
        <!-- Guess name + status -->
        <div class="min-w-0">
          <div class="font-semibold truncate">
            {{ guess.name }}
            <span v-if="guess.isCorrect" class="ml-2 text-emerald-300">✓</span>
          </div>
  
          <!-- Invalid guess message -->
          <div v-if="!guess.valid" class="text-xs text-rose-300 mt-0.5">
            {{ guess.message || 'Invalid guess' }}
          </div>
  
          <!-- Valid guess details -->
          <div v-else class="text-xs text-slate-300 mt-0.5">
            {{ kmText }} · {{ guess.dir }}
          </div>
        </div>
  
        <!-- Progress bar (only for valid guesses) -->
        <div class="w-40">
          <div v-if="guess.valid" class="progress-track" :aria-label="`closeness ${guess.score}%`">
            <div class="progress-fill" :style="{ width: barWidth }"></div>
          </div>
          <div v-else class="text-right text-slate-500 text-xs">—</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    guess: { type: Object, required: true }
  })
  
  /**
   * CSS classes depending on guess status
   */
  const rowClass = computed(() => {
    if (!props.guess.valid) {
      return 'border-rose-500/30'
    }
    if (props.guess.isCorrect) {
      return 'border-emerald-500/30 ring-1 ring-emerald-500/20'
    }
    return 'border-white/10 hover:border-white/20'
  })
  
  /**
   * Safe km display
   */
  const kmText = computed(() => {
    if (typeof props.guess?.km === 'number' && Number.isFinite(props.guess.km)) {
      return props.guess.km.toLocaleString() + ' km'
    }
    return '—'
  })
  
  /**
   * Width for progress bar
   */
  const barWidth = computed(() => {
    return (props.guess?.score ? Math.max(3, props.guess.score) : 3) + '%'
  })
  </script>
  