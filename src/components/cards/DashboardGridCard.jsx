import { motion } from 'framer-motion'

export function getInitials(name) {
  const words = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export default function DashboardGridCard({
  name,
  tag,
  logo,
  onClick,
  logoSize = 'default',
  showTag = false,
}) {
  const initials = getInitials(name)
  const Tag = onClick ? 'button' : 'div'
  const logoBoxClass = logoSize === 'lg' ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-14 h-14'

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Tag
        onClick={onClick}
        className={`w-full bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col items-center text-center transition-shadow hover:shadow-lg hover:border-slate-300 ${
          onClick ? 'cursor-pointer' : ''
        }`}
      >
        <div
          className={`${logoBoxClass} rounded-xl flex items-center justify-center mb-3 overflow-hidden ${
            logo
              ? logo.toLowerCase().includes('white')
                ? 'bg-slate-800'
                : 'bg-white border border-slate-100'
              : 'bg-slate-100'
          }`}
        >
          {logo ? (
            <img src={encodeURI(logo)} alt={name} className="w-full h-full object-contain p-1" />
          ) : (
            <span className="text-lg font-bold text-secondary">{initials}</span>
          )}
        </div>
        <h3 className="font-bold text-primary text-xs sm:text-sm leading-snug">{name}</h3>
        {showTag && tag && (
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-cyan-50 text-secondary text-xs font-medium">
            {tag}
          </span>
        )}
      </Tag>
    </motion.div>
  )
}
