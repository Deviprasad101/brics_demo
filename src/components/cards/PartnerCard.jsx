import { motion } from 'framer-motion'
import { FiExternalLink, FiMapPin } from 'react-icons/fi'

export default function PartnerCard({ partner }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="glass-card rounded-2xl p-6 group hover:shadow-2xl transition-shadow">
      <div className="h-20 flex items-center justify-center mb-4">
        {partner.logo ? (
          <img src={partner.logo} alt={partner.name} className="max-w-full max-h-20 rounded-xl object-contain" />
        ) : (
          <span className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-xl font-bold text-secondary">
            {partner.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      <span className="block text-center text-xs font-semibold text-accent uppercase tracking-wide mb-2">
        {partner.partnershipRole}
      </span>
      <h3 className="font-bold text-primary text-center mb-2 group-hover:text-secondary transition-colors">{partner.name}</h3>
      <p className="text-slate-500 text-sm text-center leading-relaxed line-clamp-3 mb-3">{partner.description}</p>
      <p className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-4">
        <FiMapPin className="w-3 h-3" /> {partner.city}, {partner.state}
      </p>
      <div className="text-center">
        <a href={partner.website} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-accent transition-colors">
          Visit Website <FiExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  )
}
