/* Deterministic dot positions — each relative to center of dot-layer.
   All values in px from the center point of the auth-dots-layer container.
   No Math.random(). Positions chosen for organic asymmetry. */

const DOTS_DESKTOP = [
  // x, y offsets from center; size in px; opacity; delay s; dur s; float x,y
  { id: 1,  x: -148, y: -92,  s: 3,   o: .50, d: .15, dur: 3.1, fx:  4, fy: -5 },
  { id: 2,  x:   72, y: -128, s: 2,   o: .35, d: .30, dur: 2.8, fx: -3, fy:  4 },
  { id: 3,  x:  168, y: -54,  s: 4,   o: .45, d: .08, dur: 3.4, fx:  2, fy:  6 },
  { id: 4,  x: -106, y: -158, s: 2.5, o: .30, d: .55, dur: 3.0, fx: -4, fy: -3 },
  { id: 5,  x:   44, y: -176, s: 3,   o: .40, d: .20, dur: 3.6, fx:  5, fy:  2 },
  { id: 6,  x:  192, y:   18, s: 2.5, o: .38, d: .70, dur: 2.9, fx: -5, fy:  4 },
  { id: 7,  x: -182, y:   36, s: 3.5, o: .42, d: .40, dur: 3.2, fx:  3, fy: -6 },
  { id: 8,  x:  132, y:  108, s: 2,   o: .28, d: .60, dur: 3.5, fx: -2, fy:  5 },
  { id: 9,  x:  -64, y:  142, s: 4,   o: .48, d: .10, dur: 2.7, fx:  6, fy:  3 },
  { id: 10, x:   96, y:  162, s: 2.5, o: .32, d: .80, dur: 3.3, fx: -4, fy: -2 },
  { id: 11, x: -124, y:  118, s: 2,   o: .36, d: .45, dur: 3.0, fx:  2, fy:  7 },
  { id: 12, x:  -36, y: -208, s: 3,   o: .38, d: .25, dur: 3.7, fx: -6, fy:  2 },
  { id: 13, x:  148, y: -146, s: 2.5, o: .30, d: .65, dur: 2.9, fx:  4, fy: -4 },
  { id: 14, x: -196, y: -118, s: 2,   o: .25, d: .85, dur: 3.4, fx: -2, fy:  5 },
  { id: 15, x:   20, y:  212, s: 3.5, o: .40, d: .35, dur: 3.1, fx:  5, fy: -3 },
  { id: 16, x: -162, y:  174, s: 2.5, o: .30, d: .75, dur: 3.6, fx: -3, fy:  4 },
  { id: 17, x:  214, y:  -96, s: 2,   o: .28, d: .50, dur: 2.8, fx:  4, fy:  5 },
  { id: 18, x:  -82, y:  -38, s: 5,   o: .22, d: .05, dur: 4.0, fx: -3, fy: -3 },
]

const DOTS_MOBILE = [
  { id: 1,  x: -88,  y: -56,  s: 2.5, o: .40, d: .15, dur: 3.1, fx:  3, fy: -3 },
  { id: 2,  x:  52,  y: -80,  s: 2,   o: .30, d: .30, dur: 2.8, fx: -2, fy:  3 },
  { id: 3,  x: 104,  y: -28,  s: 3,   o: .35, d: .10, dur: 3.4, fx:  2, fy:  4 },
  { id: 4,  x: -60,  y: -104, s: 2,   o: .25, d: .50, dur: 3.0, fx: -3, fy: -2 },
  { id: 5,  x:  28,  y: -112, s: 2.5, o: .32, d: .20, dur: 3.6, fx:  4, fy:  2 },
  { id: 6,  x: -116, y:  24,  s: 2.5, o: .35, d: .40, dur: 3.2, fx:  2, fy: -4 },
  { id: 7,  x:  80,  y:  68,  s: 2,   o: .25, d: .60, dur: 3.5, fx: -2, fy:  3 },
  { id: 8,  x: -40,  y:  88,  s: 3,   o: .38, d: .25, fx:  4,   dur: 2.7, fy:  2 },
  { id: 9,  x:  60,  y:  96,  s: 2,   o: .28, d: .70, dur: 3.3, fx: -3, fy: -2 },
  { id: 10, x: -80,  y:  64,  s: 2,   o: .30, d: .45, dur: 3.0, fx:  2, fy:  4 },
]

export default function AuthDots({ mobile = false }) {
  const dots = mobile ? DOTS_MOBILE : DOTS_DESKTOP

  return (
    <div className="auth-dots-layer" aria-hidden="true">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="auth-dot"
          style={{
            width:  `${dot.s}px`,
            height: `${dot.s}px`,
            /* Position relative to center of the container */
            left:   `calc(50% + ${dot.x}px - ${dot.s / 2}px)`,
            top:    `calc(50% + ${dot.y}px - ${dot.s / 2}px)`,
            '--dot-opacity': dot.o,
            '--dot-delay':   `${dot.d}s`,
            '--dot-dur':     `${dot.dur}s`,
            '--dot-tx':      `${dot.x}px`,
            '--dot-ty':      `${dot.y}px`,
            '--dot-fx':      `${dot.fx}px`,
            '--dot-fy':      `${dot.fy}px`,
            /* Stagger the ambient float start */
            '--dot-start':   `${dot.d + dot.dur + 0.1}s`,
            '--dot-float':   `${dot.dur * 1.2}s`,
          }}
        />
      ))}
    </div>
  )
}
