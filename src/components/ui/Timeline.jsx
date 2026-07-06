import ScrollReveal from './ScrollReveal'

export default function Timeline({ items }) {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent to-slate-200" />
      {items.map((item, i) => (
        <ScrollReveal key={`${item.year}-${item.title}`} delay={i * 0.08}>
          <div className={`relative flex items-center gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
              <div className="glass-card rounded-xl p-5 inline-block text-left">
                <span className="text-secondary font-bold text-lg">{item.year}</span>
                <h3 className="text-primary font-semibold text-lg mt-1">{item.title}</h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-md z-10" />
            <div className="flex-1 hidden md:block" />
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
