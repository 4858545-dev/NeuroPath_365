export function KulbabkaSvg({ className }) {
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
          0%   { opacity: 0.8; }
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
        .kb-main { animation: kb-sway 4s ease-in-out infinite; transform-origin: 160px 310px; }
        .kb-puff { animation: kb-puffPulse 4s ease-in-out infinite; transform-origin: 160px 155px; }
        .kb-eye-l { animation: kb-eyeBlink 6s ease-in-out infinite; transform-origin: 138px 168px; }
        .kb-eye-r { animation: kb-eyeBlink 6s ease-in-out infinite 0.15s; transform-origin: 182px 168px; }
        .kb-seed { animation: kb-floatSeed 4s ease-in infinite; }
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
        <path d="M157 245 Q155 280 156 368" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3"/>

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

        {/* Puff head */}
        <g className="kb-puff">

          {/* Head */}
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

      </g>
    </svg>
  )
}
