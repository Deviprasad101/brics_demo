import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import AllCardsPage from './pages/AllCardsPage'
import SectorsPage from './pages/SectorsPage'
import SectorDetailPage from './pages/SectorDetailPage'
import PartnersPage from './pages/PartnersPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="startups" element={<AllCardsPage />} />
          <Route path="sectors" element={<SectorsPage />} />
          <Route path="sectors/:slug" element={<SectorDetailPage />} />
          <Route path="partners" element={<PartnersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
