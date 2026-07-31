import BoltMark from '../BoltMark.jsx'

// Moment orchestré au chargement : un éclair parcourt le trajet récupération → livraison
// une seule fois. Respecte prefers-reduced-motion via la règle globale dans index.css.
export default function RouteFlash() {
  return (
    <div className="flex items-center gap-3 py-1" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-ink" />
      <div className="relative h-px flex-1 overflow-hidden border-t-2 border-dotted border-line">
        <span
          className="absolute -top-[11px] left-0 motion-reduce:hidden"
          style={{ '--travel-distance': 'calc(100% - 22px)' }}
        >
          <span className="flex h-[22px] w-[22px] animate-flash-travel items-center justify-center rounded-full bg-signal text-ink">
            <BoltMark className="h-3 w-3" />
          </span>
        </span>
      </div>
      <span className="h-2.5 w-2.5 rounded-full bg-signal" />
    </div>
  )
}
