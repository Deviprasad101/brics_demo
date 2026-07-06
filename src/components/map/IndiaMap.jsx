import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export const SECTOR_COLORS = {
  agriculture: { color: '#10B981', label: 'Agriculture', level: 1 },
  'livelihood-skilling': { color: '#8B5CF6', label: 'Livelihood & Skilling', level: 2 },
  'transportation-infrastructure': { color: '#004AAD', label: 'Transportation & Infrastructure', level: 3 },
}

function createSectorIcon(color, size = 14) {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="background:${color};width:${size}px;height:${size}px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

const partnerIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background:#0B1F3A;width:14px;height:14px;border-radius:3px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const gisIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background:#00D4FF;width:12px;height:12px;border-radius:2px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
})

function MapController({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  return null
}

function getStartupIcon(startup, colorBySector) {
  if (colorBySector && startup.sectorId) {
    const sector = SECTOR_COLORS[startup.sectorId]
    if (sector) return createSectorIcon(sector.color)
  }
  return createSectorIcon('#00D4FF')
}

export default function IndiaMap({
  states = [],
  startups = [],
  partners = [],
  projects = [],
  showStartups = true,
  showPartners = true,
  showStates = true,
  showProjects = false,
  showGis = false,
  showCss = false,
  gisProjects = [],
  cssProjects = [],
  colorBySector = false,
  activeSectors = null,
  onStateClick,
  onStartupClick,
  height = '400px',
  center = [22.5, 79],
  zoom = 5,
  className = '',
}) {
  const filteredStartups = useMemo(() => {
    if (!activeSectors) return startups
    return startups.filter((s) => activeSectors.includes(s.sectorId))
  }, [startups, activeSectors])

  return (
    <div className={`rounded-2xl overflow-hidden shadow-xl border border-slate-200 ${className}`} style={{ height }}>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <MapController center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showStates && states.map((state) => (
          <CircleMarker
            key={state.id}
            center={[state.lat, state.lng]}
            radius={16}
            pathOptions={{ color: '#00D4FF', fillColor: '#004AAD', fillOpacity: 0.15, weight: 2 }}
            eventHandlers={{ click: () => onStateClick?.(state) }}
          >
            <Popup>
              <strong>{state.name}</strong>
              <p className="text-sm text-gray-500 mt-1">{state.startupCount} Startups · {state.projectsRunning} Projects</p>
            </Popup>
          </CircleMarker>
        ))}

        {showStartups && filteredStartups.map((s) => (
          <Marker
            key={s.id}
            position={[s.lat, s.lng]}
            icon={getStartupIcon(s, colorBySector)}
            eventHandlers={{ click: () => onStartupClick?.(s) }}
          >
            <Popup>
              <div className="min-w-[160px]">
                <strong className="text-primary">{s.name}</strong>
                <p className="text-xs font-semibold mt-1" style={{ color: SECTOR_COLORS[s.sectorId]?.color }}>
                  Level {SECTOR_COLORS[s.sectorId]?.level} · {s.sector}
                </p>
                <p className="text-xs text-gray-500 mt-1">{s.pilotState}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {showPartners && partners.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={partnerIcon}>
            <Popup><strong>{p.name}</strong><p className="text-sm text-gray-500">{p.city}</p></Popup>
          </Marker>
        ))}

        {showGis && gisProjects.map((p) => (
          <Marker key={`gis-${p.id}`} position={[p.lat, p.lng]} icon={gisIcon}>
            <Popup><strong>{p.name}</strong><p className="text-sm text-gray-500">GIS · {p.location}</p></Popup>
          </Marker>
        ))}

        {showCss && cssProjects.map((p) => (
          <Marker key={`css-${p.id}`} position={[p.lat, p.lng]} icon={partnerIcon}>
            <Popup><strong>{p.name}</strong><p className="text-sm text-gray-500">CSS · {p.location}</p></Popup>
          </Marker>
        ))}

        {showProjects && projects.map((p) => (
          <Marker key={p.id} position={[p.lat || 22.5, p.lng || 79]}>
            <Popup><strong>{p.name}</strong><p className="text-sm text-gray-500">{p.state}</p></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
