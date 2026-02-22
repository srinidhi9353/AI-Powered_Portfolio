import { } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/chat/ChatWidget'

export default function App() {
  console.log("App component rendered")
  return (
    <div className="min-h-screen bg-slate-900 text-white pb-24">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <Contact />
      <Footer />

      {/* Fintech-style Bottom Blur Strip */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-slate-900/40 backdrop-blur-xl border-t border-white/10 z-40" />

      <ChatWidget />
    </div>
  )
}

