import { Link } from 'react-router-dom'
import { GiMountainCave } from 'react-icons/gi'
import { HiOutlineChip } from 'react-icons/hi'
import siteData from '../../data/site.json'

export default function Navbar() {
  const { tih } = siteData

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
              <GiMountainCave className="w-5 h-5 text-accent" />
            </div>
            <div>
              <span className="font-bold text-primary text-base leading-none">{tih.shortName}</span>
              <span className="block text-[10px] text-slate-400 leading-none mt-0.5">Operation Dronagiri</span>
            </div>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 px-3 py-1.5 rounded-full bg-slate-100">
            <HiOutlineChip className="w-3.5 h-3.5 text-secondary" />
            Govt. of India · National Innovation Mission
          </span>
        </div>
      </div>
    </nav>
  )
}
