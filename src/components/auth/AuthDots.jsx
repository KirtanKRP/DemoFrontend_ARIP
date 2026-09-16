/* =========================================================
   AUTH DOTS — CUSTOMIZATION PANEL
   Change these values to control the entire animation.
   ========================================================= */

const DOT_CONFIG = {
  // ---------- OVERALL SIZE ----------
  // 1 = original
  // 0.5 = half size
  // 1.5 = 50% larger
  scale: 1.93,

  // ---------- OVERALL SPEED ----------
  // 1 = original
  // 0.5 = faster
  // 2 = slower
  speed: 0.8,

  // ---------- MOVEMENT ----------
  // Overall distance multiplier
  // 1 = original movement
  // 0.5 = half movement
  // 2 = twice the movement
  travel: 0.7,

  // ---------- BOUNCE ----------
  // How much dots overshoot / bounce
  bounce: 1,

  // ---------- OPACITY ----------
  // Overall opacity multiplier
  opacity: 1,

  // ---------- AMBIENT FLOAT ----------
  // 0 = no floating
  // 1 = original
  // 2 = stronger floating
  float: 1,

  // ---------- ANIMATION START ----------
  // Delay before dots begin emerging
  startDelay: 0,

  // ---------- GAP BETWEEN DOTS ----------
  // Higher = more staggered
  stagger: 1,
};


/* =========================================================
   DESKTOP DOTS
   x/y     = final position from center
   s       = base size
   o       = base opacity
   d       = individual delay
   dur     = individual animation duration
   fx/fy   = ambient floating movement
   ========================================================= */

const DOTS_DESKTOP = [

  {
    id: 1,
    x: -148,
    y: -92,

    s: 3,
    o: .50,

    d: .15,
    dur: 3.1,

    fx: 4,
    fy: -5,
  },

  {
    id: 2,
    x: 72,
    y: -128,

    s: 2,
    o: .35,

    d: .30,
    dur: 2.8,

    fx: -3,
    fy: 4,
  },

  {
    id: 3,
    x: 168,
    y: -54,

    s: 4,
    o: .45,

    d: .08,
    dur: 3.4,

    fx: 2,
    fy: 6,
  },

  {
    id: 4,
    x: -106,
    y: -158,

    s: 2.5,
    o: .30,

    d: .55,
    dur: 3.0,

    fx: -4,
    fy: -3,
  },

  {
    id: 5,
    x: 44,
    y: -176,

    s: 3,
    o: .40,

    d: .20,
    dur: 3.6,

    fx: 5,
    fy: 2,
  },

  {
    id: 6,
    x: 192,
    y: 18,

    s: 2.5,
    o: .38,

    d: .70,
    dur: 2.9,

    fx: -5,
    fy: 4,
  },

  {
    id: 7,
    x: -182,
    y: 36,

    s: 3.5,
    o: .42,

    d: .40,
    dur: 3.2,

    fx: 3,
    fy: -6,
  },

  {
    id: 8,
    x: 132,
    y: 108,

    s: 2,
    o: .28,

    d: .60,
    dur: 3.5,

    fx: -2,
    fy: 5,
  },

  {
    id: 9,
    x: -64,
    y: 142,

    s: 4,
    o: .48,

    d: .10,
    dur: 2.7,

    fx: 6,
    fy: 3,
  },

  {
    id: 10,
    x: 96,
    y: 162,

    s: 2.5,
    o: .32,

    d: .80,
    dur: 3.3,

    fx: -4,
    fy: -2,
  },

  {
    id: 11,
    x: -124,
    y: 118,

    s: 2,
    o: .36,

    d: .45,
    dur: 3.0,

    fx: 2,
    fy: 7,
  },

  {
    id: 12,
    x: -36,
    y: -208,

    s: 3,
    o: .38,

    d: .25,
    dur: 3.7,

    fx: -6,
    fy: 2,
  },

  {
    id: 13,
    x: 148,
    y: -146,

    s: 2.5,
    o: .30,

    d: .65,
    dur: 2.9,

    fx: 4,
    fy: -4,
  },

  {
    id: 14,
    x: -196,
    y: -118,

    s: 2,
    o: .25,

    d: .85,
    dur: 3.4,

    fx: -2,
    fy: 5,
  },

  {
    id: 15,
    x: 20,
    y: 212,

    s: 3.5,
    o: .40,

    d: .35,
    dur: 3.1,

    fx: 5,
    fy: -3,
  },

  {
    id: 16,
    x: -162,
    y: 174,

    s: 2.5,
    o: .30,

    d: .75,
    dur: 3.6,

    fx: -3,
    fy: 4,
  },

  {
    id: 17,
    x: 214,
    y: -96,

    s: 2,
    o: .28,

    d: .50,
    dur: 2.8,

    fx: 4,
    fy: 5,
  },

  {
    id: 18,
    x: -82,
    y: -38,

    s: 5,
    o: .22,

    d: .05,
    dur: 4.0,

    fx: -3,
    fy: -3,
  },
];


/* =========================================================
   MOBILE
   ========================================================= */

const DOTS_MOBILE = [
  {
    id: 1,
    x: -88,
    y: -56,
    s: 2.5,
    o: .40,
    d: .15,
    dur: 3.1,
    fx: 3,
    fy: -3,
  },

  {
    id: 2,
    x: 52,
    y: -80,
    s: 2,
    o: .30,
    d: .30,
    dur: 2.8,
    fx: -2,
    fy: 3,
  },

  {
    id: 3,
    x: 104,
    y: -28,
    s: 3,
    o: .35,
    d: .10,
    dur: 3.4,
    fx: 2,
    fy: 4,
  },

  {
    id: 4,
    x: -60,
    y: -104,
    s: 2,
    o: .25,
    d: .50,
    dur: 3.0,
    fx: -3,
    fy: -2,
  },

  {
    id: 5,
    x: 28,
    y: -112,
    s: 2.5,
    o: .32,
    d: .20,
    dur: 3.6,
    fx: 4,
    fy: 2,
  },

  {
    id: 6,
    x: -116,
    y: 24,
    s: 2.5,
    o: .35,
    d: .40,
    dur: 3.2,
    fx: 2,
    fy: -4,
  },

  {
    id: 7,
    x: 80,
    y: 68,
    s: 2,
    o: .25,
    d: .60,
    dur: 3.5,
    fx: -2,
    fy: 3,
  },

  {
    id: 8,
    x: -40,
    y: 88,
    s: 3,
    o: .38,
    d: .25,
    dur: 2.7,
    fx: 4,
    fy: 2,
  },

  {
    id: 9,
    x: 60,
    y: 96,
    s: 2,
    o: .28,
    d: .70,
    dur: 3.3,
    fx: -3,
    fy: -2,
  },

  {
    id: 10,
    x: -80,
    y: 64,
    s: 2,
    o: .30,
    d: .45,
    dur: 3.0,
    fx: 2,
    fy: 4,
  },
];


/* =========================================================
   COMPONENT
   ========================================================= */

export default function AuthDots({ mobile = false }) {

  const dots = mobile ? DOTS_MOBILE : DOTS_DESKTOP;

  return (
    <div
      className="auth-dots-layer"
      aria-hidden="true"
      style={{
        '--dots-scale': DOT_CONFIG.scale,
        '--dots-speed': DOT_CONFIG.speed,
        '--dots-travel': DOT_CONFIG.travel,
        '--dots-bounce': DOT_CONFIG.bounce,
        '--dots-opacity': DOT_CONFIG.opacity,
        '--dots-float': DOT_CONFIG.float,
      }}
    >

      {dots.map((dot) => (

        <span
          key={dot.id}
          className="auth-dot"

          style={{
            /*
             * SIZE
             */
            width: `${dot.s * DOT_CONFIG.scale}px`,
            height: `${dot.s * DOT_CONFIG.scale}px`,

            /*
             * POSITION
             */
            left: `calc(
              50% +
              ${dot.x * DOT_CONFIG.travel}px -
              ${(dot.s * DOT_CONFIG.scale) / 2}px
            )`,

            top: `calc(
              50% +
              ${dot.y * DOT_CONFIG.travel}px -
              ${(dot.s * DOT_CONFIG.scale) / 2}px
            )`,

            /*
             * OPACITY
             */
            '--dot-opacity':
              Math.min(dot.o * DOT_CONFIG.opacity, 1),

            /*
             * ANIMATION
             */
            '--dot-delay':
              `${dot.d * DOT_CONFIG.stagger + DOT_CONFIG.startDelay}s`,

            '--dot-dur':
              `${dot.dur * DOT_CONFIG.speed}s`,

            /*
             * FINAL MOVEMENT
             */
            '--dot-tx':
              `${dot.x * DOT_CONFIG.travel}px`,

            '--dot-ty':
              `${dot.y * DOT_CONFIG.travel}px`,

            /*
             * AMBIENT FLOAT
             */
            '--dot-fx':
              `${dot.fx * DOT_CONFIG.float}px`,

            '--dot-fy':
              `${dot.fy * DOT_CONFIG.float}px`,

            /*
             * FLOAT TIMING
             */
            '--dot-start':
              `${(
                dot.d +
                dot.dur +
                0.7
              ) * DOT_CONFIG.speed}s`,

            '--dot-float':
              `${dot.dur * 3.2 * DOT_CONFIG.speed}s`,

            /*
             * BOUNCE
             */
            '--dot-bounce':
              DOT_CONFIG.bounce,
          }}
        />

      ))}

    </div>
  );
}