import DashboardDetailPage from '../components/layout/DashboardDetailPage'
import DashboardGridCard from '../components/cards/DashboardGridCard'
import sections from '../data/dashboardSections.json'
import cssProjects from '../data/css_projects.json'

export default function CssProjectsPage() {
  const config = sections.css

  return (
    <DashboardDetailPage {...config}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {cssProjects.map((project) => (
          <DashboardGridCard
            key={project.id}
            name={project.name}
            tag={project.location}
            showTag
          />
        ))}
      </div>
    </DashboardDetailPage>
  )
}
