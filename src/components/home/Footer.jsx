export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer shell"><span>PT.</span><p>Interview readiness, practiced.</p><button className="text-link" onClick={() => scrollTo('top')}>Back to top ↑</button></footer>
  )
}
