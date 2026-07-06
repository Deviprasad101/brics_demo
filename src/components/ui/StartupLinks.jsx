import { FiExternalLink } from 'react-icons/fi'

export function formatDisplayUrl(url) {
  return url?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

const linkClass =
  'inline-flex items-center gap-1 text-secondary hover:text-accent transition-colors break-all'

export default function StartupLinks({ website, websiteStatus, odSite, onLinkClick, compact = false }) {
  const stop = (e) => {
    e.stopPropagation()
    onLinkClick?.(e)
  }

  const official =
    websiteStatus === 'under_development' ? (
      <span className="text-slate-400 italic">Under development</span>
    ) : website ? (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        className={linkClass}
      >
        {formatDisplayUrl(website)} <FiExternalLink className="w-3 h-3 shrink-0" />
      </a>
    ) : (
      <span className="text-slate-400">Update soon</span>
    )

  const od = odSite ? (
    <a href={odSite} target="_blank" rel="noopener noreferrer" onClick={stop} className={linkClass}>
      {formatDisplayUrl(odSite)} <FiExternalLink className="w-3 h-3 shrink-0" />
    </a>
  ) : (
    <span className="text-slate-400">Update soon</span>
  )

  const labelClass = compact ? 'text-[10px] text-slate-500 font-semibold uppercase tracking-wide' : 'text-xs text-slate-500 font-medium'

  return (
    <div className={`w-full space-y-1.5 ${compact ? 'mt-2' : 'mt-3'}`}>
      <div className="text-xs text-left">
        <span className={labelClass}>Official site</span>
        <div className="mt-0.5">{official}</div>
      </div>
      <div className="text-xs text-left">
        <span className={labelClass}>Operation Dronagiri</span>
        <div className="mt-0.5">{od}</div>
      </div>
    </div>
  )
}
