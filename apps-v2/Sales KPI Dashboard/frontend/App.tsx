import { Routes, Route } from 'react-router-dom'
import SalesKpiDashboard from './pages/SalesKpiDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SalesKpiDashboard />} />
    </Routes>
  )
}
