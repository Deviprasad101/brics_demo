import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Researched pilot/HQ coordinates (lat/long from OpenStreetMap, Wikipedia, company registries) */
const COORDS = {
  heliot: { pilotCity: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  bhoomicam: { pilotCity: 'Vizianagaram', lat: 18.106659, lng: 83.395554 },
  qhills: { pilotCity: 'Udhagamandalam', lat: 11.4102, lng: 76.695 },
  cropgen: { pilotCity: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  srajanai: { pilotCity: 'Nashik', lat: 19.9975, lng: 73.7898 },
  terrastack: { pilotCity: 'Mundra', lat: 22.746, lng: 69.7 },
  sparkyai: { pilotCity: 'Pune', lat: 18.5204, lng: 73.8567 },
  viasalus: { pilotCity: 'Vijayawada', lat: 16.5062, lng: 80.648 },
  thazal: { pilotCity: 'Chennai', lat: 13.0827, lng: 80.2707 },
  geoinfy: { pilotCity: 'Hyderabad (Manikonda)', lat: 17.4064, lng: 78.3796 },
  'encode-nature': { pilotCity: 'Warangal', lat: 17.9784, lng: 79.5941 },
  'eelab-carbon': { pilotCity: 'Gandhinagar', lat: 23.2156, lng: 72.6369 },
  weathercast: { pilotCity: 'Mysuru', lat: 12.2958, lng: 76.6394 },
  'kisan-rover': { pilotCity: 'Kolhapur', lat: 16.705, lng: 74.2433 },
  'polygon-geospatial': { pilotCity: 'Bengaluru', lat: 12.9784, lng: 77.6408 },
  navariti: { pilotCity: 'Secunderabad', lat: 17.4399, lng: 78.4983 },
  oxbow: { pilotCity: 'Nagpur', lat: 21.1458, lng: 79.0882 },
  addble: { pilotCity: 'Hubballi', lat: 15.3647, lng: 75.124 },
  cultyvate: { pilotCity: 'Bengaluru (Jayanagar)', lat: 12.9293, lng: 77.5824 },
  'cyran-ai': { pilotCity: 'Hyderabad', lat: 17.385, lng: 78.4867 },
  ekarigari: { pilotCity: 'Pune', lat: 18.5991, lng: 73.7889 },
  scanxt: { pilotCity: 'Surat', lat: 21.1702, lng: 72.8311 },
  'terraqua-uav': { pilotCity: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
  garudalytics: { pilotCity: 'Bengaluru', lat: 12.9141, lng: 77.6411 },
}

function applyCoords(filePath) {
  const startups = JSON.parse(readFileSync(filePath, 'utf8'))
  const updated = startups.map((s) => {
    const loc = COORDS[s.id]
    if (!loc) {
      console.warn(`No coordinates for ${s.id} in ${filePath}`)
      return s
    }
    return { ...s, ...loc }
  })
  writeFileSync(filePath, `${JSON.stringify(updated, null, 2)}\n`)
}

applyCoords(join(root, 'src/data/ess_startups.json'))
applyCoords(join(root, 'src/data/gss_startups.json'))
applyCoords(join(root, 'data/ess_startups.json'))
applyCoords(join(root, 'data/gss_startups.json'))

console.log('Applied coordinates to startup data files.')
