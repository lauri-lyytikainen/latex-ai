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
            <Route path="/" element={<TranslatePage />} />
            <Route path="/translate" element={<TranslatePage />} />
            <Route path="/examples" element={<ExamplesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </>
  )
}

export default App
