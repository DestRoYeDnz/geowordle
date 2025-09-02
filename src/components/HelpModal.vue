<template>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/60" @click="$emit('update:open', false)"></div>
      <div class="relative w-full max-w-lg glass p-6">
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold">How to Play</h3>
          <button class="p-1 rounded hover:bg-white/5" @click="$emit('update:open', false)">✕</button>
        </div>
  
        <ol class="mt-4 list-decimal list-inside space-y-2 text-sm text-slate-200">
          <li>Type a country and press <kbd class="px-1 rounded bg-white/10">Enter</kbd>.</li>
          <li>Check the <span class="font-semibold">distance</span> and <span class="font-semibold">direction</span> to the target.</li>
          <li>Find the correct country within 8 guesses.</li>
        </ol>
  
        <div class="mt-4 text-xs text-slate-400">
          The bar fills as you get closer (0–100).
        </div>
  
        <div class="mt-6 text-right">
          <button class="btn btn-primary" @click="$emit('update:open', false)">Got it</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ open: { type: Boolean, default: false } })
  defineEmits(['update:open'])
  </script>
  