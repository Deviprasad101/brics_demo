import essStartups from '../data/ess_startups.json'
import gssStartups from '../data/gss_startups.json'
import statesData from '../data/states.json'

const stateByName = Object.fromEntries(statesData.map((s) => [s.name, s]))

function offsetForIndex(index, baseLat, baseLng) {
  const angle = index * 2.399963229728653
  const ring = Math.floor(index / 6)
  const radius = 0.12 + ring * 0.1
  return {
    lat: baseLat + Math.sin(angle) * radius,
    lng: baseLng + Math.cos(angle) * radius,
  }
}

export function enrichStartupForMap(startup, indexInState) {
  const state = stateByName[startup.pilotState]
  const hasCoords =
    typeof startup.lat === 'number' &&
    typeof startup.lng === 'number' &&
    Number.isFinite(startup.lat) &&
    Number.isFinite(startup.lng)

  const baseLat = state?.lat ?? 22.5
  const baseLng = state?.lng ?? 79
  const { lat, lng } = hasCoords
    ? { lat: startup.lat, lng: startup.lng }
    : offsetForIndex(indexInState, baseLat, baseLng)

  return {
    ...startup,
    state: startup.pilotState,
    stateId: state?.id ?? null,
    lat,
    lng,
  }
}

export function getMapStartups() {
  const counts = {}
  const raw = [
    ...essStartups.map((s) => ({ ...s, cohort: 'ESS' })),
    ...gssStartups.map((s) => ({ ...s, cohort: 'GSS' })),
  ]

  return raw.map((startup) => {
    const idx = counts[startup.pilotState] ?? 0
    counts[startup.pilotState] = idx + 1
    return enrichStartupForMap(startup, idx)
  })
}

export const mapStartups = getMapStartups()

export function getStartupCountsBySector() {
  return mapStartups.reduce((acc, s) => {
    acc[s.sectorId] = (acc[s.sectorId] || 0) + 1
    return acc
  }, {})
}

export function getStartupCountsByState() {
  return mapStartups.reduce((acc, s) => {
    acc[s.pilotState] = (acc[s.pilotState] || 0) + 1
    return acc
  }, {})
}
