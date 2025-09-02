<template>
  <div class="min-h-screen flex flex-col w-7xl">
    <HeaderBar @open-help="helpOpen = true" @new-game="resetGame" />

    <main class="mx-auto w-full max-w-7xl px-5 py-8 md:py-12">
      <section class="glass p-5 md:p-6 fade-up">
        <p class="text-sm text-slate-300 leading-relaxed">
          Guess today’s country. After each guess, you’ll see
          <span class="font-semibold text-slate-100">distance</span> and
          <span class="font-semibold text-slate-100">direction</span> to the target.
          Use deduction to zero in within <span class="font-semibold">8 guesses</span>.
        </p>
      </section>

      <section class="mt-6 fade-up">
        <GuessInput :countries="countries" :disabled="isOver" @submit="onGuess" />
      </section>

      <section class="mt-6 grid gap-6 md:grid-cols-2 fade-up">
        <div class="glass p-4 md:p-5">
          <h3 class="text-sm font-semibold tracking-wide text-slate-300 mb-3">Your Guesses</h3>
          <GuessList :guesses="guesses" />
        </div>

        <div class="glass p-4 md:p-5">
          <h3 class="text-sm font-semibold tracking-wide text-slate-300 mb-3">Directional Hint</h3>
          <MapHint v-if="guesses.length" :latest="guesses[0]" :target="target" />
          <div v-else class="text-sm text-slate-400">Make a guess to see hints.</div>
        </div>
      </section>

      <section class="mt-6 fade-up">
        <div
          v-if="isWin"
          class="glass border-emerald-500/30 p-5 ring-1 ring-emerald-500/20">
          <h3 class="text-emerald-300 font-semibold text-lg">You found it! 🎉</h3>
          <p class="text-emerald-200 mt-2">
            Target was <span class="font-semibold">{{ target.name }}</span>.
            Guesses: {{ guesses.length }}.
          </p>
        </div>

        <div
          v-else-if="isLose"
          class="glass border-rose-500/30 p-5 ring-1 ring-rose-500/20">
          <h3 class="text-rose-300 font-semibold text-lg">Out of guesses!</h3>
          <p class="text-rose-200 mt-2">
            The country was <span class="font-semibold">{{ target.name }}</span>.
          </p>
        </div>
      </section>
    </main>

    <HelpModal v-model:open="helpOpen" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderBar from './components/HeaderBar.vue'
import GuessInput from './components/GuessInput.vue'
import GuessList from './components/GuessList.vue'
import MapHint from './components/MapHint.vue'
import HelpModal from './components/HelpModal.vue'
import countries from './data/countries.min.json'
import useGeoGame from './composables/useGeoGame'

const helpOpen = ref(false)
const { target, guesses, maxGuesses, onGuess, resetGameFromSeed, resetGame } = useGeoGame(countries)

const isWin = computed(() => guesses.value[0]?.isCorrect)
const isLose = computed(() => !isWin.value && guesses.value.length >= maxGuesses)
const isOver = computed(() => isWin.value || isLose.value)

onMounted(() => {
  const today = new Date()
  const seed = today.toISOString().slice(0, 10)
  resetGameFromSeed(seed)
})
</script>
