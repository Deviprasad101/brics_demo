import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiMountainCave } from 'react-icons/gi'
import { FiTarget, FiEye, FiMapPin, FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { HiOutlineChip, HiOutlineGlobe } from 'react-icons/hi'
import StatsDashboard from '../components/ui/StatsDashboard'
import IndiaMap, { SECTOR_COLORS } from '../components/map/IndiaMap'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import siteData from '../data/site.json'
import startupsData from '../data/startups.json'
import partnersData from '../data/partners.json'
import statesData from '../data/states.json'
import sectorsData from '../data/sectors.json'

const SECTOR_IDS = Object.keys(SECTOR_COLORS)

export default function Home() {
  const { hero, stats, about, tih } = siteData
  const [selectedSector, setSelectedSector] = useState(null) // null = all 3 sectors
  const [selectedStartup, setSelectedStartup] = useState(null)

  const activeSectors = selectedSector ? [selectedSector] : SECTOR_IDS

  const sectorCounts = SECTOR_IDS.reduce((acc, id) => {
    acc[id] = startupsData.filter((s) => s.sectorId === id).length
    return acc
  }, {})

  const visibleStartups = useMemo(() => {
    if (!selectedSector) return startupsData
    return startupsData.filter((s) => s.sectorId === selectedSector)
  }, [selectedSector])

  const handleSectorClick = (id) => {
    setSelectedSector((prev) => (prev === id ? null : id))
    setSelectedStartup(null)
  }

  const showAllSectors = () => {
    setSelectedSector(null)
    setSelectedStartup(null)
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* TIH ↔ Operation Dronagiri connection banner */}
      <header className="hero-gradient border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-8 lg:mb-10"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/30">
              <GiMountainCave className="w-3.5 h-3.5" /> Government of India Initiative
            </span>
            <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Technology Innovation Hub powers Operation Dronagiri
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {tih.relationship}
            </p>
          </motion.div>

          {/* TIH ↔ OD bridge — equal columns, centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="max-w-5xl mx-auto mb-8 lg:mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-5 items-stretch">
              <a
                href={tih.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full min-h-[168px] p-5 sm:p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 hover:border-accent/40 transition-all group text-left"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <HiOutlineChip className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {tih.shortName}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-accent transition-colors">
                  {tih.name}
                </h2>
                <p className="text-slate-300 text-sm mt-2 flex-1 leading-relaxed">{tih.tagline}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent mt-4 pt-4 border-t border-white/10">
                  Visit TIH website <FiExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>

              <div className="flex md:flex-col items-center justify-center gap-2 py-2 md:py-0 md:px-1">
                <div className="hidden md:block w-px flex-1 min-h-[24px] bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                  <FiArrowRight className="w-5 h-5 text-accent md:rotate-0 rotate-90" />
                </div>
                <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Powers</span>
                <div className="hidden md:block w-px flex-1 min-h-[24px] bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
              </div>

              <a
                href={hero.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col h-full min-h-[168px] p-5 sm:p-6 rounded-2xl bg-white/10 border border-accent/30 backdrop-blur-sm hover:bg-white/15 hover:border-accent/50 transition-all group text-left"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <HiOutlineGlobe className="w-6 h-6 text-accent" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded-full">
                    Mission
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-accent transition-colors">
                  {hero.title}
                </h2>
                <p className="text-slate-300 text-sm mt-2 flex-1 leading-relaxed line-clamp-3">{hero.subtitle}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent mt-4 pt-4 border-t border-white/10">
                  Visit mission portal <FiExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </motion.div>

          <p className="max-w-4xl mx-auto text-center text-slate-200 text-sm leading-relaxed mb-10 px-2">
            {tih.connection}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-6xl mx-auto space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: FiTarget, title: 'Mission', content: about.mission },
                { icon: FiEye, title: 'Vision', content: about.vision },
              ].map((card) => (
                <div key={card.title} className="p-5 rounded-2xl bg-white/5 border border-white/10 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <card.icon className="w-4 h-4 text-accent shrink-0" />
                    <h3 className="font-semibold text-white text-sm">{card.title}</h3>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{card.content}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {about.nationalImpact.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-5 rounded-2xl bg-white/10 border border-white/10 text-center"
                >
                  <div className="text-xl sm:text-2xl font-bold text-accent">{item.value}</div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">{item.label}</div>
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
                  const sectorStartups = startupsData.filter((s) => s.sectorId === sector.id)
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
                            Level {meta.level} · {sector.name}
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
                                  onClick={(e) => { e.stopPropagation(); setSelectedStartup(s) }}
                                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                                >
                                  <img src={s.logo} alt="" className="w-7 h-7 rounded-md" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-primary truncate">{s.name}</p>
                                    <p className="text-[10px] text-slate-400 flex items-center gap-0.5">
                                      <FiMapPin className="w-2.5 h-2.5" /> {s.pilotState}
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
                            L{meta.level}
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
                  <img src={selectedStartup.logo} alt="" className="w-10 h-10 rounded-lg" />
                  <div>
                    <h4 className="font-bold text-primary">{selectedStartup.name}</h4>
                    <p className="text-xs" style={{ color: SECTOR_COLORS[selectedStartup.sectorId]?.color }}>
                      Level {SECTOR_COLORS[selectedStartup.sectorId]?.level} · {selectedStartup.sector}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedStartup.description}</p>
                <p className="text-xs text-slate-400 mt-2">{selectedStartup.pilotState}</p>
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
                    : `All 3 sectors · ${startupsData.length} startups`}
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
                    L{SECTOR_COLORS[id].level}
                  </button>
                ))}
              </div>
            </div>

            <IndiaMap
              states={statesData}
              startups={startupsData}
              partners={partnersData}
              showStartups
              showPartners={!selectedSector}
              showStates={!selectedSector}
              colorBySector
              activeSectors={activeSectors}
              onStartupClick={setSelectedStartup}
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
                  <p className="text-xs text-slate-500 mt-1">L{SECTOR_COLORS[id].level} · {SECTOR_COLORS[id].label.split(' ')[0]}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-primary mb-4">Corporate Partners · Vizianagaram</h3>
          <div className="flex flex-wrap gap-3">
            {partnersData.map((p) => (
              <div key={p.id} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-slate-200">
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="w-8 h-8 rounded-lg object-contain" />
                ) : (
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-secondary">
                    {p.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="text-sm font-medium text-primary">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
