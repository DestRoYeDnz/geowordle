<template>
    <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
      <div class="mx-auto max-w-7xl px-5 py-3 flex items-center justify-between">
        <h1 class="text-xl font-extrabold tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400">
            GeoWordle
          </span>
        </h1>
        <div class="flex items-center gap-2">
          <button class="btn btn-ghost" @click="$emit('new-game')">New Game</button>
          <button class="btn btn-primary" @click="$emit('open-help')">Help</button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  defineEmits(['open-help','new-game'])
  </script>
  