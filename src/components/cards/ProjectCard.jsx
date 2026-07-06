import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-card rounded-2xl overflow-hidden group transition-shadow hover:shadow-2xl"
    >
      <div className="h-44 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-navy-950 mb-2 group-hover:text-cyan-600 transition-colors">
          {project.name}
        </h3>
        <p className="text-navy-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.technology.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
