
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import ViralityReport from "./pages/ViralityReport"
import { Toaster } from "sonner"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/virality-report" element={<ViralityReport />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
