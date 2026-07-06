export default function SectionHeading({ badge, title, subtitle, light = false }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
          light ? 'bg-accent/20 text-accent' : 'bg-secondary/10 text-secondary'
        }`}>{badge}</span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${light ? 'text-white' : 'text-primary'}`}>{title}</h2>
      {subtitle && <p className={`text-lg ${light ? 'text-slate-300' : 'text-slate-500'}`}>{subtitle}</p>}
    </div>
  )
}
