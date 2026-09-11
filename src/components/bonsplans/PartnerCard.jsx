import { buildPartnerWhatsAppLink } from '../../utils/whatsapp.js'

export default function PartnerCard({ partner }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-ticket border border-line bg-paper">
      <img
        src={partner.image}
        alt=""
        className="h-auto w-full object-contain"
        loading="lazy"
      />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="font-display text-xl font-bold text-ink">{partner.nom}</h3>
          <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
            {partner.categorie}
          </p>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-ink-soft">
          {partner.description}
        </p>

        <a
          href={buildPartnerWhatsAppLink(partner.whatsapp, partner.nom)}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-flex min-h-[44px] items-center justify-center rounded-full bg-whatsapp px-4 text-sm font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5"
        >
          Contacter sur WhatsApp
        </a>
      </div>
    </article>
  )
}