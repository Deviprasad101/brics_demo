import DashboardDetailPage from '../components/layout/DashboardDetailPage'
import DashboardGridCard from '../components/cards/DashboardGridCard'
import sections from '../data/dashboardSections.json'
import partnersData from '../data/partners.json'

export default function PartnersPage() {
  const config = sections.partners

  return (
    <DashboardDetailPage {...config}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {partnersData.map((partner) => (
          <DashboardGridCard
            key={partner.id}
            name={partner.name}
            logo={partner.logo}
            logoSize="lg"
          />
        ))}
      </div>
    </DashboardDetailPage>
  )
}
