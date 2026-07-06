import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}
