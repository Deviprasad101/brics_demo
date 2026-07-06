import { motion } from 'framer-motion'

export default function InnovationCard({ project, type = 'gis' }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl transition-shadow">
      <div className="h-44 overflow-hidden relative">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${type === 'gis' ? 'bg-secondary' : 'bg-primary'}`}>
          {type === 'gis' ? 'GIS' : 'CSS'}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{project.name}</h3>
        <p className="text-xs text-accent font-semibold mb-2">{project.location}</p>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">{project.objective}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.technology.slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{t}</span>
          ))}
        </div>
        <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg p-2 line-clamp-2">{project.outcomes}</p>
      </div>
    </motion.div>
  )
}
