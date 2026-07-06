import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiMountainCave } from 'react-icons/gi'
import { FiTarget, FiEye, FiMapPin, FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { HiOutlineChip, HiOutlineGlobe } from 'react-icons/hi'
import StatsDashboard from '../components/ui/StatsDashboard'
import StartupLinks from '../components/ui/StartupLinks'
import IndiaMap, { SECTOR_COLORS } from '../components/map/IndiaMap'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import siteData from '../data/site.json'
import { mapStartups, getStartupCountsBySector } from '../utils/mapStartups'
import partnersData from '../data/partners.json'
import statesData from '../data/states.json'
import sectorsData from '../data/sectors.json'

const SECTOR_IDS = Object.keys(SECTOR_COLORS)

export default function Home() {
  const { hero, stats, about, tih } = siteData
  const [selectedSector, setSelectedSector] = useState(null) // null = all 3 sectors
  const [selectedStartup, setSelectedStartup] = useState(null)

  const activeSectors = selectedSector ? [selectedSector] : SECTOR_IDS

  const sectorCounts = getStartupCountsBySector()

  const visibleStartups = useMemo(() => {
    if (!selectedSector) return mapStartups
    return mapStartups.filter((s) => s.sectorId === selectedSector)
  }, [selectedSector])

  const handleSectorClick = (id) => {
    setSelectedSector((prev) => (prev === id ? null : id))
    setSelectedStartup(null)
  }

  const showAllSectors = () => {
    setSelectedSector(null)
    setSelectedStartup(null)
  }

  const selectStartup = (startup) => {
    setSelectedStartup(startup)
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* TIH ↔ Operation Dronagiri connection banner */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Main Hero Header Removed per user request */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-6xl mx-auto space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: FiTarget, title: 'Mission', content: about.mission },
                { icon: FiEye, title: 'Vision', content: about.vision },
              ].map((card) => (
                <div key={card.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <card.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="font-bold text-primary text-base">{card.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{card.content}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {about.nationalImpact.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="px-5 py-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-center"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-secondary mb-1">{item.value}</div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <StatsDashboard stats={stats} />
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">

          <div className="lg:col-span-4 space-y-5">
            {/* 3 Sectors selector */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary">3 Focus Sectors</h3>
                <button
                  onClick={showAllSectors}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                    !selectedSector ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Show All 3
                </button>
              </div>
              <div className="space-y-2">
                {sectorsData.map((sector) => {
                  const meta = SECTOR_COLORS[sector.id]
                  const isSelected = selectedSector === sector.id
                  const isActive = !selectedSector || isSelected
                  const sectorStartups = mapStartups.filter((s) => s.sectorId === sector.id)
                  return (
                    <button
                      key={sector.id}
                      onClick={() => handleSectorClick(sector.id)}
                      className={`w-full text-left rounded-xl border-2 transition-all overflow-hidden ${
                        isSelected
                          ? 'border-current shadow-md'
                          : isActive
                            ? 'border-slate-200 bg-white hover:shadow-sm'
                            : 'border-transparent bg-slate-50 opacity-40'
                      }`}
                      style={isSelected ? { borderColor: meta.color } : {}}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <span
                          className="w-4 h-4 rounded-full shrink-0 border-2 border-white shadow"
                          style={{ backgroundColor: meta.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-primary">
                            {sector.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{sector.tagline}</p>
                        </div>
                        <span className="text-lg font-bold" style={{ color: meta.color }}>
                          {sectorCounts[sector.id]}
                        </span>
                      </div>
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-slate-100"
                            style={{ borderTopColor: `${meta.color}33` }}
                          >
                            <p className="px-3 pt-2 pb-1 text-xs text-slate-600 leading-relaxed">{sector.description}</p>
                            <div className="px-3 pb-3 space-y-1.5 max-h-48 overflow-y-auto">
                              {sectorStartups.map((s) => (
                                <div
                                  key={s.id}
                                  onClick={(e) => { e.stopPropagation(); selectStartup(s) }}
                                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                                    selectedStartup?.id === s.id
                                      ? 'bg-cyan-50 ring-1 ring-secondary/30'
                                      : 'hover:bg-slate-50'
                                  }`}
                                >
                                  {s.logo ? (
                                    <img src={encodeURI(s.logo)} alt="" className="w-7 h-7 rounded-md object-contain" />
                                  ) : (
                                    <span className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-bold text-secondary shrink-0">
                                      {s.name.slice(0, 2).toUpperCase()}
                                    </span>
                                  )}
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-primary truncate">{s.name}</p>
                                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                      <span className="font-medium text-secondary/80">{s.cohort}</span>
                                      <span>·</span>
                                      <FiMapPin className="w-2.5 h-2.5" /> {s.pilotCity ? `${s.pilotCity}, ` : ''}{s.pilotState}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* All 3 sectors expanded view */}
            <AnimatePresence>
              {!selectedSector && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="glass-card rounded-2xl p-5"
                >
                  <h3 className="font-bold text-primary mb-3">All 3 Sectors Overview</h3>
                  <div className="grid gap-3">
                    {sectorsData.map((sector) => {
                      const meta = SECTOR_COLORS[sector.id]
                      return (
                        <button
                          key={sector.id}
                          onClick={() => handleSectorClick(sector.id)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:shadow-sm transition-all text-left"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
                            style={{ backgroundColor: meta.color }}
                          >
                            {sector.name.slice(0, 1)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-primary">{sector.name}</p>
                            <p className="text-xs text-slate-500">{sectorCounts[sector.id]} startups</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {selectedStartup && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-5 border-2"
                style={{ borderColor: SECTOR_COLORS[selectedStartup.sectorId]?.color }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {selectedStartup.logo ? (
                    <img src={encodeURI(selectedStartup.logo)} alt="" className="w-10 h-10 rounded-lg object-contain" />
                  ) : (
                    <span className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-secondary">
                      {selectedStartup.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <div>
                    <h4 className="font-bold text-primary">{selectedStartup.name}</h4>
                    <p className="text-xs" style={{ color: SECTOR_COLORS[selectedStartup.sectorId]?.color }}>
                      {selectedStartup.cohort} · {selectedStartup.sector}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedStartup.description}</p>
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <FiMapPin className="w-3 h-3" /> {selectedStartup.pilotCity ? `${selectedStartup.pilotCity}, ` : ''}{selectedStartup.pilotState}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <StartupLinks
                    website={selectedStartup.website}
                    websiteLabel={selectedStartup.websiteLabel}
                    websiteStatus={selectedStartup.websiteStatus}
                    odSite={selectedStartup.odSite}
                    odSiteLabel={selectedStartup.odSiteLabel}
                    odSiteStatus={selectedStartup.odSiteStatus}
                    compact
                  />
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-primary">India Innovation Map</h2>
                <p className="text-sm text-slate-500">
                  {selectedSector
                    ? `Showing ${SECTOR_COLORS[selectedSector].label} · ${visibleStartups.length} startups`
                    : `All 3 sectors · ${mapStartups.length} startups`}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={showAllSectors}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    !selectedSector ? 'bg-secondary text-white border-secondary' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All 3
                </button>
                {SECTOR_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => handleSectorClick(id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                      selectedSector === id
                        ? 'text-white border-transparent'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    style={selectedSector === id ? { backgroundColor: SECTOR_COLORS[id].color } : {}}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: selectedSector === id ? 'white' : SECTOR_COLORS[id].color }}
                    />
                    {SECTOR_COLORS[id].label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <IndiaMap
              states={statesData}
              startups={visibleStartups}
              partners={partnersData}
              showStartups
              showPartners={!selectedSector}
              showStates={!selectedSector}
              colorBySector
              activeSectors={activeSectors}
              focusedStartupId={selectedStartup?.id}
              onStartupClick={selectStartup}
              height="520px"
              zoom={selectedSector ? 5.5 : 5}
              className="flex-1 shadow-2xl min-h-[480px] lg:min-h-[560px]"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={showAllSectors}
                className={`glass-card rounded-xl p-4 text-center transition-all hover:shadow-md ${
                  !selectedSector ? 'ring-2 ring-secondary' : ''
                }`}
              >
                <div className="text-2xl font-bold text-secondary">
                  <AnimatedCounter value={stats.startups} />
                </div>
                <p className="text-xs text-slate-500 mt-1">All Startups</p>
              </button>
              {SECTOR_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => handleSectorClick(id)}
                  className={`glass-card rounded-xl p-4 text-center transition-all hover:shadow-md ${
                    selectedSector === id ? 'ring-2' : ''
                  }`}
                  style={selectedSector === id ? { ringColor: SECTOR_COLORS[id].color } : {}}
                >
                  <div className="text-2xl font-bold" style={{ color: SECTOR_COLORS[id].color }}>
                    <AnimatedCounter value={sectorCounts[id]} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{SECTOR_COLORS[id].label.split(' ')[0]}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
