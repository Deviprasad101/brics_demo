import { Link } from 'react-router-dom'
import AnimatedCounter from './AnimatedCounter'
import ScrollReveal from './ScrollReveal'
import { FiUsers, FiLayers, FiBriefcase } from 'react-icons/fi'
import sections from '../../data/dashboardSections.json'

const icons = [FiUsers, FiLayers, FiBriefcase]

const routes = [
  sections.startups.path,
  sections.sectors.path,
  sections.partners.path,
]

export default function StatsDashboard({ stats, className = '' }) {
  const items = [
    { label: 'Startups', value: stats.startups },
    { label: 'Sectors', value: stats.sectors },
    { label: 'Corporate Partners', value: stats.partners },
  ]

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 ${className}`}>
      {items.map((item, i) => {
        const Icon = icons[i]
        return (
          <ScrollReveal key={item.label} delay={i * 0.06}>
            <Link
              to={routes[i]}
              className="glass-card rounded-2xl p-5 text-center hover:shadow-2xl transition-all w-full block cursor-pointer hover:ring-2 hover:ring-secondary/30"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-primary">
                <AnimatedCounter value={item.value} />
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">{item.label}</p>
            </Link>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
