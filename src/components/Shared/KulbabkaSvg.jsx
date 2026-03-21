export function KulbabkaSvg({ className, noSeeds = false }) {
  return (
    <svg
      className={className}
      width="320"
      height="420"
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes kb-sway {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(-8px); }
        }
        @keyframes kb-floatSeed {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 0.8; }
          100% { transform: translate(var(--kb-dx), var(--kb-dy)) rotate(var(--kb-dr)); opacity: 0; }
        }
        @keyframes kb-eyeBlink {
          0%, 88%, 100% { transform: scaleY(1); }
          94% { transform: scaleY(0.07); }
        }
        @keyframes kb-puffPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .kb-main  { animation: kb-sway 4s ease-in-out infinite; transform-origin: 160px 310px; }
        .kb-puff  { animation: kb-puffPulse 4s ease-in-out infinite; transform-origin: 160px 155px; }
        .kb-eye-l { animation: kb-eyeBlink 6s ease-in-out infinite; transform-origin: 138px 168px; }
        .kb-eye-r { animation: kb-eyeBlink 6s ease-in-out infinite 0.15s; transform-origin: 182px 168px; }
        .kb-seed  { animation: kb-floatSeed 4s ease-in infinite; }
        .kb-s1 { --kb-dx: -30px; --kb-dy: -60px; --kb-dr: -20deg; animation-delay: 0s;   animation-duration: 5s;   }
        .kb-s2 { --kb-dx:  40px; --kb-dy: -70px; --kb-dr:  15deg; animation-delay: 1s;   animation-duration: 4.5s; }
        .kb-s3 { --kb-dx: -50px; --kb-dy: -40px; --kb-dr: -30deg; animation-delay: 2s;   animation-duration: 6s;   }
        .kb-s4 { --kb-dx:  60px; --kb-dy: -50px; --kb-dr:  25deg; animation-delay: 0.5s; animation-duration: 5.5s; }
        .kb-s5 { --kb-dx:  20px; --kb-dy: -80px; --kb-dr:  10deg; animation-delay: 1.5s; animation-duration: 4s;   }
        .kb-s6 { --kb-dx: -40px; --kb-dy: -65px; --kb-dr: -15deg; animation-delay: 2.5s; animation-duration: 5s;   }
      `}</style>

      <defs>
        <radialGradient id="kb-puffGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"/>
          <stop offset="40%"  stopColor="#f0f8f0" stopOpacity="0.98"/>
          <stop offset="80%"  stopColor="#ddf0e8" stopOpacity="0.92"/>
          <stop offset="100%" stopColor="#c8e8d8" stopOpacity="0.88"/>
        </radialGradient>
        <radialGradient id="kb-puffGlow" cx="40%" cy="35%" r="55%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="kb-stemG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#2e7d32"/>
          <stop offset="40%"  stopColor="#66bb6a"/>
          <stop offset="100%" stopColor="#388e3c"/>
        </linearGradient>
        <linearGradient id="kb-leafG1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#a5d6a7"/>
          <stop offset="50%"  stopColor="#4caf50"/>
          <stop offset="100%" stopColor="#2e7d32"/>
        </linearGradient>
        <linearGradient id="kb-leafG2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#b9f0b0"/>
          <stop offset="50%"  stopColor="#43a047"/>
          <stop offset="100%" stopColor="#1b5e20"/>
        </linearGradient>
        <radialGradient id="kb-irisG" cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#c8860a"/>
          <stop offset="40%"  stopColor="#7a4f10"/>
          <stop offset="100%" stopColor="#1a0e04"/>
        </radialGradient>
        <radialGradient id="kb-blushG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#ffb3ba" stopOpacity="0.75"/>
          <stop offset="100%" stopColor="#ffb3ba" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="kb-shadowG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1a4a1a" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#1a4a1a" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="kb-seedDot" cx="30%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#e8d898"/>
          <stop offset="100%" stopColor="#b8a848"/>
        </radialGradient>
        <filter id="kb-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="kb-puffEdge" x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="2.5"/>
        </filter>
        <filter id="kb-furTex" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" seed="5"/>
          <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="kb-leafFilter" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#1b5e20" floodOpacity="0.3"/>
        </filter>
      </defs>

      <ellipse cx="160" cy="408" rx="48" ry="10" fill="url(#kb-shadowG)"/>

      <g className="kb-main">

        {/* Stem */}
        <path d="M156 240 Q153 270 154 310 Q154 340 155 370 Q155 378 160 380 Q165 378 165 370 Q166 340 166 310 Q167 270 164 240"
              fill="url(#kb-stemG)" stroke="#2e7d32" strokeWidth="0.5"/>
        <path d="M157 245 Q155 280 156 368"
              stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3"/>

        {/* Leaves */}
        <g filter="url(#kb-leafFilter)">
          <path d="M156 355
                   C 152 347, 144 338, 130 333
                   C 125 335, 118 330, 123 325
                   C 118 321, 107 317, 94 313
                   C 88 316, 81 310, 87 305
                   C 82 300, 73 293, 66 285
                   C 60 288, 54 281, 61 276
                   C 57 269, 54 260, 58 252
                   C 52 254, 47 247, 55 242
                   C 53 235, 56 226, 62 222
                   C 59 217, 58 210, 65 208
                   C 71 206, 74 214, 75 220
                   C 79 215, 85 211, 89 216
                   C 92 221, 89 229, 88 235
                   C 93 231, 100 228, 103 234
                   C 106 240, 101 248, 99 254
                   C 105 252, 112 250, 115 257
                   C 117 263, 112 270, 109 276
                   C 115 275, 122 275, 124 282
                   C 126 289, 121 295, 118 300
                   C 124 299, 131 299, 133 307
                   C 135 314, 129 320, 126 323
                   C 132 323, 139 325, 141 332
                   C 143 339, 138 344, 135 346
                   C 140 346, 149 349, 152 354
                   C 154 358, 152 361, 149 362
                   C 153 361, 156 358, 156 355 Z"
                fill="url(#kb-leafG1)"/>
          <path d="M155 355 C 136 334, 106 302, 80 272 C 66 255, 59 238, 66 222"
                stroke="#2e7d32" strokeWidth="0.8" fill="none" opacity="0.45" strokeLinecap="round"/>
          <path d="M164 355
                   C 168 347, 176 338, 190 333
                   C 195 335, 202 330, 197 325
                   C 202 321, 213 317, 226 313
                   C 232 316, 239 310, 233 305
                   C 238 300, 247 293, 254 285
                   C 260 288, 266 281, 259 276
                   C 263 269, 266 260, 262 252
                   C 268 254, 273 247, 265 242
                   C 267 235, 264 226, 258 222
                   C 261 217, 262 210, 255 208
                   C 249 206, 246 214, 245 220
                   C 241 215, 235 211, 231 216
                   C 228 221, 231 229, 232 235
                   C 227 231, 220 228, 217 234
                   C 214 240, 219 248, 221 254
                   C 215 252, 208 250, 205 257
                   C 203 263, 208 270, 211 276
                   C 205 275, 198 275, 196 282
                   C 194 289, 199 295, 202 300
                   C 196 299, 189 299, 187 307
                   C 185 314, 191 320, 194 323
                   C 188 323, 181 325, 179 332
                   C 177 339, 182 344, 185 346
                   C 180 346, 171 349, 168 354
                   C 166 358, 168 361, 171 362
                   C 167 361, 164 358, 164 355 Z"
                fill="url(#kb-leafG2)"/>
          <path d="M165 355 C 184 334, 214 302, 240 272 C 254 255, 261 238, 254 222"
                stroke="#2e7d32" strokeWidth="0.8" fill="none" opacity="0.45" strokeLinecap="round"/>
        </g>

        {/* Puff group */}
        <g className="kb-puff">

          {!noSeeds && (
          <><ellipse cx="160" cy="158" rx="100" ry="95" fill="white" opacity="0.18" filter="url(#kb-puffEdge)"/>
          <ellipse cx="160" cy="158" rx="88"  ry="83" fill="white" opacity="0.22" filter="url(#kb-puffEdge)"/>

          {/* Seed stems */}
          <g opacity="0.85" stroke="#d8d0b0" strokeLinecap="round">
            <line x1="160" y1="90"  x2="160" y2="48"  strokeWidth="1.2"/>
            <line x1="178" y1="93"  x2="192" y2="52"  strokeWidth="1"/>
            <line x1="142" y1="93"  x2="128" y2="52"  strokeWidth="1"/>
            <line x1="194" y1="103" x2="218" y2="66"  strokeWidth="1"/>
            <line x1="126" y1="103" x2="102" y2="66"  strokeWidth="1"/>
            <line x1="218" y1="130" x2="252" y2="108" strokeWidth="1"/>
            <line x1="102" y1="130" x2="68"  y2="108" strokeWidth="1"/>
            <line x1="228" y1="158" x2="268" y2="148" strokeWidth="1"/>
            <line x1="92"  y1="158" x2="52"  y2="148" strokeWidth="1"/>
            <line x1="222" y1="185" x2="260" y2="185" strokeWidth="1"/>
            <line x1="98"  y1="185" x2="60"  y2="185" strokeWidth="1"/>
            <line x1="210" y1="210" x2="242" y2="225" strokeWidth="1"/>
            <line x1="110" y1="210" x2="78"  y2="225" strokeWidth="1"/>
            <line x1="185" y1="228" x2="205" y2="250" strokeWidth="1"/>
            <line x1="135" y1="228" x2="115" y2="250" strokeWidth="1"/>
          </g>

          {/* Seed heads */}
          <g filter="url(#kb-glow)">
            <circle cx="160" cy="46" r="8" fill="white" opacity="0.95"/>
            <circle cx="160" cy="46" r="5" fill="white" opacity="1"/>
            <line x1="160" y1="38" x2="160" y2="34" stroke="white" strokeWidth="0.8" opacity="0.7"/>
            <line x1="168" y1="40" x2="172" y2="37" stroke="white" strokeWidth="0.8" opacity="0.7"/>
            <line x1="152" y1="40" x2="148" y2="37" stroke="white" strokeWidth="0.8" opacity="0.7"/>
            <line x1="166" y1="46" x2="170" y2="46" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="154" y1="46" x2="150" y2="46" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="193" cy="50" r="7" fill="white" opacity="0.9"/>
            <circle cx="193" cy="50" r="4" fill="white" opacity="1"/>
            <line x1="193" y1="43" x2="193" y2="39" stroke="white" strokeWidth="0.8" opacity="0.7"/>
            <line x1="200" y1="45" x2="204" y2="42" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="186" y1="45" x2="182" y2="42" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="127" cy="50" r="7" fill="white" opacity="0.9"/>
            <circle cx="127" cy="50" r="4" fill="white" opacity="1"/>
            <line x1="127" y1="43" x2="127" y2="39" stroke="white" strokeWidth="0.8" opacity="0.7"/>
            <line x1="134" y1="45" x2="138" y2="42" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="120" y1="45" x2="116" y2="42" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="220" cy="64" r="7.5" fill="white" opacity="0.88"/>
            <circle cx="220" cy="64" r="4.5" fill="white" opacity="1"/>
            <line x1="220" y1="56" x2="220" y2="52" stroke="white" strokeWidth="0.8" opacity="0.7"/>
            <line x1="228" y1="60" x2="232" y2="57" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="212" y1="60" x2="208" y2="57" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="100" cy="64" r="7.5" fill="white" opacity="0.88"/>
            <circle cx="100" cy="64" r="4.5" fill="white" opacity="1"/>
            <line x1="100" y1="56" x2="100" y2="52" stroke="white" strokeWidth="0.8" opacity="0.7"/>
            <line x1="108" y1="60" x2="112" y2="57" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="92"  y1="60" x2="88"  y2="57" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="254" cy="106" r="7" fill="white" opacity="0.82"/>
            <circle cx="254" cy="106" r="4" fill="white" opacity="1"/>
            <line x1="262" y1="103" x2="266" y2="101" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="254" y1="98"  x2="254" y2="94"  stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="66" cy="106" r="7" fill="white" opacity="0.82"/>
            <circle cx="66" cy="106" r="4" fill="white" opacity="1"/>
            <line x1="58" y1="103" x2="54" y2="101" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="66" y1="98"  x2="66" y2="94"  stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="270" cy="147" r="6.5" fill="white" opacity="0.78"/>
            <circle cx="270" cy="147" r="4"   fill="white" opacity="1"/>
            <line x1="278" y1="144" x2="283" y2="142" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="270" y1="139" x2="270" y2="135" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="50" cy="147" r="6.5" fill="white" opacity="0.78"/>
            <circle cx="50" cy="147" r="4"   fill="white" opacity="1"/>
            <line x1="42" y1="144" x2="37" y2="142" stroke="white" strokeWidth="0.8" opacity="0.6"/>
            <line x1="50" y1="139" x2="50" y2="135" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="262" cy="184" r="6.5" fill="white" opacity="0.78"/>
            <circle cx="262" cy="184" r="4"   fill="white" opacity="1"/>
            <line x1="270" y1="180" x2="275" y2="177" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="58" cy="184" r="6.5" fill="white" opacity="0.78"/>
            <circle cx="58" cy="184" r="4"   fill="white" opacity="1"/>
            <line x1="50" y1="180" x2="45" y2="177" stroke="white" strokeWidth="0.8" opacity="0.6"/>

            <circle cx="244" cy="224" r="6"   fill="white" opacity="0.72"/>
            <circle cx="244" cy="224" r="3.5" fill="white" opacity="1"/>
            <line x1="252" y1="220" x2="256" y2="217" stroke="white" strokeWidth="0.7" opacity="0.6"/>

            <circle cx="76" cy="224" r="6"   fill="white" opacity="0.72"/>
            <circle cx="76" cy="224" r="3.5" fill="white" opacity="1"/>
            <line x1="68" y1="220" x2="64" y2="217" stroke="white" strokeWidth="0.7" opacity="0.6"/>

            <circle cx="207" cy="252" r="5.5" fill="white" opacity="0.68"/>
            <circle cx="207" cy="252" r="3.5" fill="white" opacity="1"/>

            <circle cx="113" cy="252" r="5.5" fill="white" opacity="0.68"/>
            <circle cx="113" cy="252" r="3.5" fill="white" opacity="1"/>
          </g>

          {/* Seed base dots */}
          <g fill="url(#kb-seedDot)" opacity="0.6">
            <circle cx="160" cy="90"  r="3"/>
            <circle cx="178" cy="93"  r="2.5"/>
            <circle cx="142" cy="93"  r="2.5"/>
            <circle cx="194" cy="103" r="2.5"/>
            <circle cx="126" cy="103" r="2.5"/>
            <circle cx="218" cy="130" r="2"/>
            <circle cx="102" cy="130" r="2"/>
            <circle cx="228" cy="158" r="2"/>
            <circle cx="92"  cy="158" r="2"/>
            <circle cx="222" cy="185" r="2"/>
            <circle cx="98"  cy="185" r="2"/>
            <circle cx="210" cy="210" r="2"/>
            <circle cx="110" cy="210" r="2"/>
          </g>
          </>)}

          {/* Puff body */}
          <ellipse cx="160" cy="162" rx="76" ry="72" fill="url(#kb-puffGrad)" filter="url(#kb-furTex)"/>
          <ellipse cx="160" cy="162" rx="76" ry="72" fill="url(#kb-puffGlow)"/>
          <ellipse cx="135" cy="135" rx="22" ry="18" fill="white" opacity="0.35" transform="rotate(-15 135 135)"/>

          {/* Blush */}
          <ellipse cx="122" cy="185" rx="22" ry="14" fill="url(#kb-blushG)"/>
          <ellipse cx="198" cy="185" rx="22" ry="14" fill="url(#kb-blushG)"/>

          {/* Left eye */}
          <g className="kb-eye-l">
            <ellipse cx="138" cy="168" rx="20" ry="22" fill="white" opacity="0.96"/>
            <ellipse cx="139" cy="170" rx="15" ry="17" fill="url(#kb-irisG)"/>
            <ellipse cx="139" cy="171" rx="9"  ry="11" fill="#0a0604"/>
            <ellipse cx="132" cy="161" rx="5"  ry="6"  fill="white" opacity="0.92"/>
            <circle  cx="147" cy="178" r="2.5" fill="white" opacity="0.6"/>
            <ellipse cx="138" cy="182" rx="6"  ry="2"  fill="white" opacity="0.2"/>
            <path d="M120 158 Q124 152 130 156" stroke="#5a3010" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
            <path d="M128 154 Q133 148 139 153" stroke="#5a3010" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
            <path d="M137 153 Q143 148 148 154" stroke="#5a3010" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
          </g>

          {/* Right eye */}
          <g className="kb-eye-r">
            <ellipse cx="182" cy="168" rx="20" ry="22" fill="white" opacity="0.96"/>
            <ellipse cx="183" cy="170" rx="15" ry="17" fill="url(#kb-irisG)"/>
            <ellipse cx="183" cy="171" rx="9"  ry="11" fill="#0a0604"/>
            <ellipse cx="176" cy="161" rx="5"  ry="6"  fill="white" opacity="0.92"/>
            <circle  cx="191" cy="178" r="2.5" fill="white" opacity="0.6"/>
            <ellipse cx="182" cy="182" rx="6"  ry="2"  fill="white" opacity="0.2"/>
            <path d="M164 158 Q168 152 174 156" stroke="#5a3010" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
            <path d="M172 154 Q177 148 183 153" stroke="#5a3010" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
            <path d="M181 153 Q187 148 192 154" stroke="#5a3010" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6"/>
          </g>

          {/* Nose + smile */}
          <circle cx="160" cy="196" r="3" fill="#c8906a" opacity="0.55"/>
          <path d="M144 208 Q160 224 176 208" stroke="#5a3a1a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M148 210 Q160 220 172 210" stroke="#8a6a3a" strokeWidth="1"   strokeLinecap="round" fill="none" opacity="0.4"/>

        </g>

        {/* Floating seeds */}
        {!noSeeds && (<><g className="kb-seed kb-s1">
          <line x1="72" y1="118" x2="72" y2="100" stroke="white" strokeWidth="0.8" opacity="0.7"/>
          <circle cx="72" cy="99" r="3.5" fill="white" opacity="0.75" filter="url(#kb-glow)"/>
        </g>
        <g className="kb-seed kb-s2">
          <line x1="248" y1="105" x2="248" y2="88" stroke="white" strokeWidth="0.8" opacity="0.7"/>
          <circle cx="248" cy="87" r="3" fill="white" opacity="0.7" filter="url(#kb-glow)"/>
        </g>
        <g className="kb-seed kb-s3">
          <line x1="55" y1="165" x2="55" y2="148" stroke="white" strokeWidth="0.8" opacity="0.65"/>
          <circle cx="55" cy="147" r="3" fill="white" opacity="0.65" filter="url(#kb-glow)"/>
        </g>
        <g className="kb-seed kb-s4">
          <line x1="268" y1="160" x2="268" y2="143" stroke="white" strokeWidth="0.8" opacity="0.65"/>
          <circle cx="268" cy="142" r="3" fill="white" opacity="0.65" filter="url(#kb-glow)"/>
        </g>
        <g className="kb-seed kb-s5">
          <line x1="160" y1="44" x2="160" y2="28" stroke="white" strokeWidth="0.8" opacity="0.7"/>
          <circle cx="160" cy="27" r="3.5" fill="white" opacity="0.7" filter="url(#kb-glow)"/>
        </g>
        <g className="kb-seed kb-s6">
          <line x1="112" y1="250" x2="112" y2="234" stroke="white" strokeWidth="0.8" opacity="0.6"/>
          <circle cx="112" cy="233" r="2.5" fill="white" opacity="0.6" filter="url(#kb-glow)"/>
        </g>

        {/* Bokeh */}
        <circle cx="42"  cy="200" r="4" fill="white" opacity="0.2"  filter="url(#kb-glow)"/>
        <circle cx="278" cy="220" r="5" fill="white" opacity="0.18" filter="url(#kb-glow)"/>
        <circle cx="38"  cy="260" r="3" fill="white" opacity="0.15"/>
        <circle cx="282" cy="270" r="3" fill="white" opacity="0.15"/>
        </>)}

      </g>
    </svg>
  )
}
