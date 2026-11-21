export default function HeroText() {
  return (
    <div className="hero-text">
      <span className="hero-badge">Available for work</span>

      <h1>
        Hi, I'm <span className="hero-accent">Your Name</span>
        <br />
        Frontend Developer
      </h1>

      <p className="hero-desc">
        I build fast, interactive websites with React, Next.js and Three.js.
      </p>

      <div className="hero-actions">
        <a href="#projects" className="btn btn-primary">View projects</a>
        <a href="#contact" className="btn btn-outline">Contact me</a>
      </div>
    </div>
  )
}
