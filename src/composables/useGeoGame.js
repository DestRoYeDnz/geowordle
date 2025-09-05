import { ref } from 'vue'

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const toRad = d => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function bearingDeg(lat1, lon1, lat2, lon2) {
  const toRad = d => (d * Math.PI) / 180
  const toDeg = r => (r * 180) / Math.PI
  const φ1 = toRad(lat1)
  const φ2 = toRad(lat2)
  const λ1 = toRad(lon1)
  const λ2 = toRad(lon2)
  const y = Math.sin(λ2 - λ1) * Math.cos(φ2)
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)
  const θ = Math.atan2(y, x)
  return (toDeg(θ) + 360) % 360
}

function bearingToCompass(bearing) {
  const dirs = [
    'N','NNE','NE','ENE','E','ESE','SE','SSE',
    'S','SSW','SW','WSW','W','WNW','NW','NNW'
  ]
  const idx = Math.round(bearing / 22.5) % 16
  return dirs[idx]
}

// Simple deterministic index from seed string
function seededIndex(seed, max) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }
  return Math.abs(h) % max
}

export default function useGeoGame(countries) {
  const target = ref(null)
  const guesses = ref([])
  const maxGuesses = 8

  function resetGameFromSeed(seed) {
    const idx = seededIndex(seed, countries.length)
    target.value = countries[idx]
    console.log(countries[idx])
    guesses.value = []
  }

  function resetGame() {
    const idx = Math.floor(Math.random() * countries.length)
    target.value = countries[idx]
    console.log(countries[idx])
    guesses.value = []
  }

  function onGuess(name) {
    if (!target.value) return
    const found = countries.find(
      c => c.name.toLowerCase() === name.trim().toLowerCase()
    )
    if (!found) {
      // store a rejected guess row so user sees feedback
      guesses.value.unshift({
        name: name.trim(),
        valid: false,
        message: 'Unknown country',
        isCorrect: false
      })
      return
    }

    const km = Math.round(
      haversineKm(found.lat, found.lon, target.value.lat, target.value.lon)
    )

    const brg = bearingDeg(found.lat, found.lon, target.value.lat, target.value.lon)
    const dir = bearingToCompass(brg)

    // similarity: 100% at 0 km; ~0% at antipodal distance (~20037km)
    const score = Math.max(0, Math.round(100 * (1 - km / 20037)))

    const isCorrect = found.code === target.value.code

    guesses.value.unshift({
      name: found.name,
      code: found.code,
      km,
      dir,
      score,
      isCorrect,
      valid: true
    })
  }

  return {
    target,
    guesses,
    maxGuesses,
    onGuess,
    resetGameFromSeed,
    resetGame
  }
}
