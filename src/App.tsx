import './App.css'
import HeroText from './components/HeroText'
import ThreeScene from './components/ThreeScene'

export default function App() {
  return (
    <section className="hero">
      <HeroText />
      <div className="hero-scene">
        <ThreeScene />
      </div>
    </section>
  )
}
