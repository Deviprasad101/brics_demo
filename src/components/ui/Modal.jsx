import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import { FiExternalLink } from 'react-icons/fi'
import StartupLinks from './StartupLinks'

const SECTOR_TECH = {
  Agriculture: ['Computer Vision', 'IoT Sensors', 'Satellite Analytics', 'ML'],
  'Livelihood & Skilling': ['EdTech Platform', 'NLP', 'AR/VR Training', 'Mobile App'],
  'Transportation & Infrastructure': ['GIS', 'GPS Telematics', 'IoT Monitoring', 'AI/ML'],
}

export default function Modal({ isOpen, onClose, startup }) {
  if (!startup) return null

  const tech = startup.technology || SECTOR_TECH[startup.sector] || ['AI/ML', 'Cloud']

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl sm:max-h-[90vh] overflow-y-auto z-50 bg-white rounded-2xl shadow-2xl"
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                {startup.logo ? (
                  <img src={encodeURI(startup.logo)} alt={startup.name} className="w-12 h-12 rounded-xl object-contain" />
                ) : (
                  <span className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-secondary">
                    {startup.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-primary">{startup.name}</h3>
                  <p className="text-sm text-secondary">{startup.sector} · {startup.pilotState}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
                <HiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h4 className="font-semibold text-primary mb-2">Startup Story</h4>
                <p className="text-slate-600 leading-relaxed text-sm">{startup.story || startup.description}</p>
              </div>

              <div className="grid gap-3">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <h4 className="font-semibold text-red-800 mb-1 text-sm">Problem Solved</h4>
                  <p className="text-red-700/80 text-sm">{startup.problemSolved || startup.problemStatement}</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <h4 className="font-semibold text-secondary mb-1 text-sm">Solution</h4>
                  <p className="text-blue-700/80 text-sm">{startup.solution}</p>
                </div>
                <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-100">
                  <h4 className="font-semibold text-cyan-800 mb-2 text-sm">Technology</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white text-cyan-700 font-medium border border-cyan-200">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-1 text-sm">Impact</h4>
                  <p className="text-emerald-700/80 text-sm">{startup.impact}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-4">
                <div>
                  <span className="text-xs text-slate-400">Pilot State</span>
                  <p className="font-semibold text-primary">{startup.pilotState}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <StartupLinks
                    website={startup.website}
                    websiteStatus={startup.websiteStatus}
                    odSite={startup.odSite}
                  />
                </div>
                <div className="flex flex-wrap gap-3 justify-end">
                  {startup.websiteStatus === 'under_development' ? (
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-500 rounded-xl text-sm font-medium">
                      Official site under development
                    </span>
                  ) : startup.website ? (
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl hover:bg-primary transition-colors text-sm font-medium"
                    >
                      Official site <FiExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}
                  {startup.odSite ? (
                    <a
                      href={startup.odSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-secondary text-secondary rounded-xl hover:bg-secondary hover:text-white transition-colors text-sm font-medium"
                    >
                      Operation Dronagiri <FiExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-400 rounded-xl text-sm">
                      OD page — update soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
