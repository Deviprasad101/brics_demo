import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import DashboardDetailPage from '../components/layout/DashboardDetailPage'
import sections from '../data/dashboardSections.json'
import sectorsData from '../data/sectors.json'
import essStartups from '../data/ess_startups.json'
import gssStartups from '../data/gss_startups.json'
import { SECTOR_COLORS } from '../components/map/IndiaMap'

const allStartups = [...essStartups, ...gssStartups]

export default function SectorsPage() {
  const config = sections.sectors

  return (
    <DashboardDetailPage {...config}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sectorsData.map((sector) => {
          const meta = SECTOR_COLORS[sector.id]
          const count = allStartups.filter((s) => s.sectorId === sector.id).length

          return (
            <motion.div key={sector.id} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Link
                to={`/sectors/${sector.slug}`}
                className="group block rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${sector.color} opacity-70`} />
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: meta.color }}
                    >
                      Focus Sector
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold leading-tight">{sector.name}</h3>
                    <p className="text-sm text-white/90 mt-1">{sector.tagline}</p>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-slate-600 leading-relaxed">{sector.description}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      {count} startups
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary group-hover:text-accent transition-colors">
                      View sector <FiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </DashboardDetailPage>
  )
}
