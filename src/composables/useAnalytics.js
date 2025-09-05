// src/composables/useAnalytics.js
import { onMounted, onBeforeUnmount, ref } from 'vue'

export default function useAnalytics({ writeKey, dataPlaneUrl, enabled = true } = {}) {
  const active = ref(!!enabled)

  function init() {
    if (!active.value || window.rudderanalytics) return
    window.rudderanalytics = window.rudderanalytics || []
    window.rudderanalytics.methods = [
      "load","page","track","identify","group","alias","ready","reset",
      "getAnonymousId","setAnonymousId"
    ]
    window.rudderanalytics.factory = function(t){
      return function(){ window.rudderanalytics.push([t].concat([].slice.call(arguments))) }
    }
    for (let m of window.rudderanalytics.methods) window.rudderanalytics[m] = window.rudderanalytics.factory(m)
    window.rudderanalytics.load(writeKey, dataPlaneUrl)
    window.rudderanalytics.page() // <-- page call
  }

  function track(event, props = {}) {
    if (!active.value) return
    try { window.rudderanalytics?.track(event, props) } catch {}
  }

  function identify(userId, traits = {}) {
    if (!active.value) return
    try { window.rudderanalytics?.identify(userId, traits) } catch {}
  }

  function enable(v = true) { active.value = v }
  function disable() { active.value = false }

  onMounted(init)

  return { track, identify, enable, disable }
}
