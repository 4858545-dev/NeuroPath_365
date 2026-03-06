export function SproutSvg({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Тіло */}
      <ellipse cx="70" cy="110" rx="38" ry="42" fill="#c8e6c4" />
      {/* Животик */}
      <ellipse cx="70" cy="118" rx="22" ry="26" fill="#e8f5e3" />

      {/* Ліве вушко-листок */}
      <ellipse cx="38" cy="80" rx="14" ry="22" fill="#7bb876" transform="rotate(-25 38 80)" />
      <ellipse cx="38" cy="80" rx="9" ry="16" fill="#a8d5a2" transform="rotate(-25 38 80)" />

      {/* Праве вушко-листок */}
      <ellipse cx="102" cy="80" rx="14" ry="22" fill="#7bb876" transform="rotate(25 102 80)" />
      <ellipse cx="102" cy="80" rx="9" ry="16" fill="#a8d5a2" transform="rotate(25 102 80)" />

      {/* Голова */}
      <ellipse cx="70" cy="75" rx="34" ry="32" fill="#c8e6c4" />

      {/* Листочки на голові */}
      <ellipse cx="55" cy="46" rx="8" ry="16" fill="#7bb876" transform="rotate(-15 55 46)" />
      <ellipse cx="70" cy="42" rx="8" ry="18" fill="#5a9e55" />
      <ellipse cx="85" cy="46" rx="8" ry="16" fill="#7bb876" transform="rotate(15 85 46)" />

      {/* Очі */}
      <ellipse cx="58" cy="74" rx="7" ry="8" fill="#4a3f35" />
      <ellipse cx="82" cy="74" rx="7" ry="8" fill="#4a3f35" />
      {/* Відблиски */}
      <circle cx="61" cy="71" r="2.5" fill="white" />
      <circle cx="85" cy="71" r="2.5" fill="white" />

      {/* Рум'янець */}
      <ellipse cx="50" cy="84" rx="7" ry="4" fill="#f9a8a8" opacity="0.6" />
      <ellipse cx="90" cy="84" rx="7" ry="4" fill="#f9a8a8" opacity="0.6" />

      {/* Носик */}
      <ellipse cx="70" cy="82" rx="3" ry="2" fill="#7bb876" />

      {/* Ротик — усмішка */}
      <path d="M61 89 Q70 97 79 89" stroke="#4a3f35" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Ручки */}
      <ellipse cx="34" cy="120" rx="10" ry="7" fill="#c8e6c4" transform="rotate(-30 34 120)" />
      <ellipse cx="106" cy="120" rx="10" ry="7" fill="#c8e6c4" transform="rotate(30 106 120)" />

      {/* Ніжки */}
      <ellipse cx="56" cy="150" rx="12" ry="7" fill="#a8d5a2" />
      <ellipse cx="84" cy="150" rx="12" ry="7" fill="#a8d5a2" />
    </svg>
  )
}
