<template>
    <form @submit.prevent="submit" class="glass p-3 md:p-4 flex flex-col gap-3">
      <div class="relative">
        <input
          v-model="value"
          list="countries"
          :disabled="disabled"
          placeholder="Type a country (e.g., Japan) and hit Enter…"
          class="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
        />
        <datalist id="countries">
          <option v-for="c in countries" :key="c.code" :value="c.name" />
        </datalist>
      </div>
      <div class="flex items-center justify-between text-xs text-slate-400">
        <span>Tip: Start with a far-away country to get a bearing.</span>
        <button type="submit" :disabled="disabled" class="btn btn-primary disabled:opacity-50">
          Guess
        </button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const props = defineProps({ countries: Array, disabled: Boolean })
  const emit = defineEmits(['submit'])
  const value = ref('')
  
  function submit() {
    if (!value.value.trim()) return
    emit('submit', value.value)
    value.value = ''
  }
  </script>
  