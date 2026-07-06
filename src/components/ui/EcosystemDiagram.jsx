import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiBriefcase, FiMapPin, FiGlobe, FiShield, FiCpu, FiArrowRight } from 'react-icons/fi'
import ScrollReveal from './ScrollReveal'

const iconMap = { FiUsers, FiBriefcase, FiMapPin, FiGlobe, FiShield, FiCpu }
const routeMap = {
  startups: '/startups', partners: '/partners', states: '/pilot-states',
  gis: '/innovations', css: '/innovations', lab: '/lab-projects',
}

export default function EcosystemDiagram({ items, centerLabel = 'Operation Dronagiri' }) {
  return (
    <ScrollReveal>
      <div className="relative max-w-4xl mx-auto py-8">
        <div className="flex justify-center mb-10">
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(0,212,255,0.4)', '0 0 0 20px rgba(0,212,255,0)', '0 0 0 0 rgba(0,212,255,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-8 py-5 rounded-2xl hero-gradient text-white text-center shadow-2xl"
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-1">Mission Hub</p>
            <h3 className="text-2xl font-bold">{centerLabel}</h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon] || FiUsers
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={routeMap[item.id] || '/'} className="block group">
                  <div className="glass-card rounded-2xl p-5 text-center hover:shadow-xl transition-all border-t-4"
                    style={{ borderTopColor: item.color }}>
                    <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <div className="text-2xl font-bold text-primary">{item.count}</div>
                    <p className="text-sm text-slate-500 font-medium">{item.label}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-secondary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <FiArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </ScrollReveal>
  )
}
