import { useState, useMemo } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import DashboardGridCard from '../components/cards/DashboardGridCard'
import Modal from '../components/ui/Modal'
import sectorsData from '../data/sectors.json'
import essStartups from '../data/ess_startups.json'
import gssStartups from '../data/gss_startups.json'
import { SECTOR_COLORS } from '../components/map/IndiaMap'

const allStartups = [...essStartups, ...gssStartups]

export default function SectorDetailPage() {
  const { slug } = useParams()
  const [selectedStartup, setSelectedStartup] = useState(null)

  const sector = sectorsData.find((s) => s.slug === slug || s.id === slug)

  const sectorStartups = useMemo(
    () => (sector ? allStartups.filter((s) => s.sectorId === sector.id) : []),
    [sector]
  )

  if (!sector) {
    return <Navigate to="/sectors" replace />
  }

  const meta = SECTOR_COLORS[sector.id]

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Link
          to="/sectors"
          className="inline-flex items-center gap-2 text-secondary text-sm font-medium hover:text-accent transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Focus Sectors
        </Link>

        <div
          className="rounded-2xl overflow-hidden border-2 bg-white mb-10"
          style={{ borderColor: meta.color }}
        >
          <div className="relative h-52 sm:h-64">
            <img src={sector.image} alt={sector.name} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-r ${sector.color} opacity-75`} />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">
                Level {meta.level} · Focus Sector
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{sector.name}</h1>
              <p className="text-white/90 mt-2 max-w-2xl text-base sm:text-lg">{sector.tagline}</p>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <div>
              <h2 className="text-lg font-bold text-primary mb-2">About this sector</h2>
              <p className="text-slate-600 leading-relaxed">{sector.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary mb-2">Overview</h2>
              <p className="text-slate-600 leading-relaxed">{sector.overview}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {sector.impactMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl bg-slate-50 border border-slate-100 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-primary">
                    {metric.label === 'Active Startups' ? sectorStartups.length : metric.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{metric.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary mb-4">Success Stories</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {sector.successStories.map((story) => (
                  <div key={story.title} className="rounded-xl border border-slate-200 p-4 bg-white">
                    <h3 className="font-semibold text-primary text-sm">{story.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{story.desc}</p>
                    <p className="text-xs text-secondary font-medium mt-2">{story.startup}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 text-white"
            style={{ backgroundColor: meta.color }}
          >
            Level {meta.level}
          </span>
          <h2 className="text-2xl font-bold text-primary mb-1">
            Startups in {sector.name}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {sectorStartups.length} startups · ESS & GSS cohorts
          </p>

          {sectorStartups.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {sectorStartups.map((startup) => (
                <DashboardGridCard
                  key={startup.id}
                  name={startup.name}
                  logo={startup.logo}
                  logoSize="lg"
                  onClick={() => setSelectedStartup(startup)}
                />
              ))}
            </div>
          ) : (
            <p className="text-slate-400 text-sm py-8 text-center rounded-xl border border-dashed border-slate-200">
              No startups listed for this sector yet.
            </p>
          )}
        </section>
      </div>

      <Modal isOpen={!!selectedStartup} onClose={() => setSelectedStartup(null)} startup={selectedStartup} />
    </div>
  )
}
