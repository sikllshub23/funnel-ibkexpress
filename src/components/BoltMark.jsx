// Marque signature d'IBK Express : un éclair anguleux, référence au flash
// et aux tampons encreurs des bons de course. Réutilisé dans l'UI et les icônes PWA.
export default function BoltMark({ className = 'h-6 w-6', filled = true }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? 0 : 6}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M58 6 L24 54 L46 54 L40 94 L78 42 L54 42 Z" />
    </svg>
  )
}
