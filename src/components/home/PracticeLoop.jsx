const Arrow = () => <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" /></svg>

export default function PracticeLoop() {
  return (
    <section className="scroll-story" id="start">
      <div className="shell story-inner">
        <div className="story-copy"><p className="eyebrow">Built for the whole practice loop</p><h2>Every session moves you forward.</h2><p>Choose your role, speak naturally, and leave with something useful—not just another list of questions.</p><button className="pill dark">Build my first session <Arrow /></button></div>
        <div className="stack" aria-label="Interview practice flow">
          <article className="stack-card card-resume"><span>01</span><h3>Your resume</h3><p>Questions grounded in the work you've actually done.</p><div className="resume-lines"><i /><i /><i /></div></article>
          <article className="stack-card card-voice"><span>02</span><h3>Your voice</h3><p>A calm, structured interview that listens.</p><div className="mini-wave">|||||||||</div></article>
          <article className="stack-card card-report"><span>03</span><h3>Your next step</h3><p>Feedback that makes the next answer sharper.</p><div className="report-score">82 <small>clarity</small></div></article>
        </div>
      </div>
    </section>
  )
}
