import TranslatePage from "./pages/TranslatePage"
import ExamplesPage from "./pages/ExamplesPage"
import AboutPage from "./pages/AboutPage"
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<TranslatePage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
