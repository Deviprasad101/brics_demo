import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function DashboardDetailPage({ badge, title, description, children }) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-secondary text-sm font-medium hover:text-accent transition-colors mb-8"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-secondary text-xs font-bold tracking-wide mb-4">
          {badge}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3">{title}</h1>
        <p className="text-slate-500 text-base sm:text-lg max-w-3xl mb-10">{description}</p>

        {children}
      </div>
    </div>
  )
}
