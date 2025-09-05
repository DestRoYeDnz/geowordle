<template>
  <div class="space-y-2">
    <GuessRow v-for="(g, i) in guesses" :key="i" :guess="g" />
    <p v-if="guesses.length === 0" class="text-slate-400 text-sm">
      No guesses yet. Try a country!
    </p>
  </div>
</template>

<script setup>
import GuessRow from './GuessRow.vue'
defineProps({ guesses: { type: Array, required: true } })
</script>
