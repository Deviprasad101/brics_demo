import DashboardDetailPage from '../components/layout/DashboardDetailPage'
import DashboardGridCard from '../components/cards/DashboardGridCard'
import sections from '../data/dashboardSections.json'
import statesData from '../data/states.json'

export default function PilotStatesPage() {
  const config = sections.states

  return (
    <DashboardDetailPage badge={config.badge} title={config.title} description={config.description}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statesData.map((state) => (
          <DashboardGridCard
            key={state.id}
            name={state.name}
            tag={`${state.startupCount} Startups · ${state.projectsRunning} Projects`}
            showTag
          />
        ))}
      </div>
    </DashboardDetailPage>
  )
}
