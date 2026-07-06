import { useState } from 'react'
import DashboardDetailPage from '../components/layout/DashboardDetailPage'
import DashboardGridCard from '../components/cards/DashboardGridCard'
import Modal from '../components/ui/Modal'
import essStartups from '../data/ess_startups.json'
import gssStartups from '../data/gss_startups.json'

export default function AllCardsPage() {
  const [selected, setSelected] = useState(null)

  return (
    <DashboardDetailPage
      badge="OD"
      title="Operation Dronagiri Startups"
      description="Early-stage and growth-stage startups driving the national innovation mission."
    >
      <section id="ess" className="mb-14 scroll-mt-24">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-cyan-50 text-secondary text-xs font-bold mb-2">
            ESS
          </span>
          <h2 className="text-2xl font-bold text-primary">Early Stage Startups</h2>
          <p className="text-slate-500 text-sm mt-1">{essStartups.length} startups across three focus sectors</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {essStartups.map((startup) => (
            <DashboardGridCard
              key={startup.id}
              name={startup.name}
              logo={startup.logo}
              logoSize="lg"
              onClick={() => setSelected(startup)}
            />
          ))}
        </div>
      </section>

      <section id="gss" className="scroll-mt-24">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold mb-2">
            GSS
          </span>
          <h2 className="text-2xl font-bold text-primary">Growth Stage Startups</h2>
          <p className="text-slate-500 text-sm mt-1">{gssStartups.length} startups scaling national deployment</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {gssStartups.map((startup) => (
            <DashboardGridCard
              key={startup.id}
              name={startup.name}
              logo={startup.logo}
              logoSize="lg"
              onClick={() => setSelected(startup)}
            />
          ))}
        </div>
      </section>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} startup={selected} />
    </DashboardDetailPage>
  )
}
