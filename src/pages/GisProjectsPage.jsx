import DashboardDetailPage from '../components/layout/DashboardDetailPage'
import DashboardGridCard from '../components/cards/DashboardGridCard'
import sections from '../data/dashboardSections.json'
import gisProjects from '../data/gis_projects.json'

export default function GisProjectsPage() {
  const config = sections.gis

  return (
    <DashboardDetailPage {...config}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {gisProjects.map((project) => (
          <DashboardGridCard
            key={project.id}
            name={project.name}
            tag={project.sector}
            showTag
          />
        ))}
      </div>
    </DashboardDetailPage>
  )
}
