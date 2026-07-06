import { motion } from 'framer-motion'

export default function BarChart({ data, labelKey = 'label', valueKey = 'value', maxValue, color = '#004AAD', suffix = '' }) {
  const max = maxValue || Math.max(...data.map((d) => d[valueKey]))

  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={item[labelKey]}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600 font-medium">{item[labelKey]}</span>
            <span className="text-primary font-bold">{item[valueKey]}{suffix}</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(item[valueKey] / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${color}, #00D4FF)` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
