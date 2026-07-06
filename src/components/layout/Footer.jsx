import { Link } from 'react-router-dom'
import { GiMountainCave } from 'react-icons/gi'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import siteData from '../../data/site.json'

export default function Footer() {
  const { contact, tih } = siteData

  return (
    <footer className="bg-primary text-slate-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
                <GiMountainCave className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">{tih.shortName} · Operation Dronagiri</span>
                <span className="block text-xs text-slate-400">{tih.name}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{tih.connection}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiMapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-accent" />
                <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors">{contact.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-accent" />
                <span>{contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {tih.name}. Government of India.
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: FaTwitter, href: contact.social.twitter },
              { Icon: FaLinkedinIn, href: contact.social.linkedin },
              { Icon: FaYoutube, href: contact.social.youtube },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
