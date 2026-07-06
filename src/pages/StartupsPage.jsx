import { useState } from 'react'
import DashboardDetailPage from '../components/layout/DashboardDetailPage'
import DashboardGridCard from '../components/cards/DashboardGridCard'
import Modal from '../components/ui/Modal'
import sections from '../data/dashboardSections.json'
import essStartups from '../data/ess_startups.json'

export default function StartupsPage() {
  const config = sections.startups
  const [selected, setSelected] = useState(null)

  return (
    <DashboardDetailPage {...config}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {essStartups.map((startup) => (
          <DashboardGridCard
            key={startup.id}
            name={startup.name}
            tag={startup.sector}
            logo={startup.logo}
            website={startup.website}
            websiteStatus={startup.websiteStatus}
            odSite={startup.odSite}
            showStartupLinks
            onClick={() => setSelected(startup)}
          />
        ))}
      </div>
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} startup={selected} />
    </DashboardDetailPage>
  )
}
