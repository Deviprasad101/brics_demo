import { motion } from 'framer-motion'
import { FiExternalLink, FiMapPin } from 'react-icons/fi'

export default function StartupCard({ startup, onClick }) {
  return (
    <motion.div whileHover={{ y: -6 }} onClick={() => onClick?.(startup)}
      className="glass-card rounded-2xl p-5 cursor-pointer group hover:shadow-2xl transition-shadow">
      <div className="flex items-start gap-4 mb-3">
        <img src={startup.logo} alt={startup.name} className="w-14 h-14 rounded-xl shadow-sm" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-primary group-hover:text-secondary transition-colors truncate">{startup.name}</h3>
          <p className="text-sm text-secondary">{startup.sector}</p>
        </div>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{startup.description}</p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
          <FiMapPin className="w-3 h-3" /> {startup.pilotState}
        </span>
        <a href={startup.website} target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} className="text-secondary hover:text-accent transition-colors">
          <FiExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}
