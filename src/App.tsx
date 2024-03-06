import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import FAQ from './components/FAQ'
import Navigation from './components/Navigation'

function App() {
  

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/about' Component={About} />
          <Route path='/faq'  Component={FAQ} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
