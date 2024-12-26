import TranslatePage from "./pages/TranslatePage"
import ExamplesPage from "./pages/ExamplesPage"
import AboutPage from "./pages/AboutPage"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <div style={{ minHeight: "calc(100vh - 6rem)" }}>
        <NavBar />
        <Router>
          <Routes>
            <Route path="/latex-ai/" element={<TranslatePage />} />
            <Route path="/latex-ai/translate" element={<TranslatePage />} />
            <Route path="/latex-ai/examples" element={<ExamplesPage />} />
            <Route path="/latex-ai/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  )
}

export default App
