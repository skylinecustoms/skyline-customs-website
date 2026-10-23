/**
 * Spanish promo cards for the /es service pages: this month's PPF special
 * from the database on /es/ppf, and the ceramic special on /es/ceramic.
 * Both send the reader to the Spanish quote form on the same page.
 */
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import LeadPulse from "@/components/LeadPulse";

const MONTHS: Record<string, string> = { January: "enero", February: "febrero", March: "marzo", April: "abril", May: "mayo", June: "junio", July: "julio", August: "agosto", September: "septiembre", October: "octubre", November: "noviembre", December: "diciembre" };
/** "October 31, 2026" -> "31 de octubre de 2026"; anything else is returned as is. */
export function fechaEs(d?: string | null): string {
  if (!d) return "";
  const m = d.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  return m && MONTHS[m[1]] ? `${m[2]} de ${MONTHS[m[1]]} de ${m[3]}` : d;
}

export function EsPpfPromoCard() {
  const { data: promo } = trpc.promo.getActive.useQuery();
  const price = Number(String(promo?.price ?? "").replace(/[^0-9.]/g, "")) || 0;
  const remaining = (promo?.totalSlots ?? 21) - (promo?.slots?.length ?? 0);
  if (!promo?.title || !price || remaining <= 0) return null;
  let included: { name: string; isFree: boolean }[] = [];
  try { included = promo.includedServices ? (JSON.parse(promo.includedServices) as { name: string; isFree: boolean }[]).filter((i) => i?.name) : []; } catch { included = []; }
  return (
    <section className="bg-[#0A0A0A] pb-14">
      <div className="container max-w-5xl">
        <aside className="relative bg-gradient-to-br from-[#1a0f05] to-[#0D0D0D] border-2 border-[#E85D04]/70 p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-10 items-center" aria-label="Especial del mes">
          <span className="absolute -top-px -right-px bg-[#E85D04] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">Solo este mes</span>
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Especial de este mes</p>
            <p className="font-['Bebas_Neue',sans-serif] text-6xl md:text-7xl text-[#E85D04] leading-none mb-2">${price.toLocaleString("en-US")}</p>
            <p className="text-white font-semibold text-lg leading-snug mb-1">{promo.title}</p>
            <p className="text-zinc-400 text-sm">Todo incluido, sin extras.{promo.endDate ? ` Precio garantizado hasta el ${fechaEs(promo.endDate)}.` : ""}</p>
          </div>
          <div>
            {included.length > 0 && (
              <ul className="space-y-2 mb-5 text-sm text-zinc-200">
                {included.map((i) => (
                  <li key={i.name} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" /><span>{i.name}{i.isFree && <span className="ml-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">Gratis</span>}</span></li>
                ))}
              </ul>
            )}
            <a href="#cotizar" data-cta="es-ppf-promo-card" className="cta w-full inline-flex items-center justify-center gap-2 bg-[#E85D04] text-black font-['Bebas_Neue',sans-serif] text-xl md:text-2xl tracking-[0.1em] uppercase px-6 py-4 hover:bg-orange-600 transition-colors">
              Aparte su cupo <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-zinc-400 text-xs mt-3 text-center"><span className="text-emerald-400 font-semibold">{remaining} cupos disponibles</span>{promo.endDate ? ` · Termina el ${fechaEs(promo.endDate)}` : ""}</p>
            <LeadPulse lang="es" className="mt-2" />
            <p className="text-zinc-500 text-xs mt-3 text-center"><Link href="/es/promo" className="underline underline-offset-2 hover:text-white">Ver todos los detalles del especial</Link></p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function EsCeramicPromoCard() {
  return (
    <section className="bg-[#0A0A0A] pb-14">
      <div className="container max-w-5xl">
        <aside className="relative bg-gradient-to-br from-[#1a0f05] to-[#0D0D0D] border-2 border-[#E85D04]/70 p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-10 items-center" aria-label="Especial de recubrimiento cerámico">
          <span className="absolute -top-px -right-px bg-[#E85D04] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1.5">Vidrios + rines gratis</span>
          <div>
            <p className="text-[#E85D04] text-xs font-bold tracking-[0.3em] uppercase mb-2">Especial de este mes</p>
            <p className="font-['Bebas_Neue',sans-serif] text-6xl md:text-7xl text-[#E85D04] leading-none mb-2">$995</p>
            <p className="text-white font-semibold text-lg leading-snug mb-1">Recubrimiento cerámico System X completo + vidrios y rines gratis</p>
            <p className="text-zinc-400 text-sm">Todo incluido, sin extras. Garantía registrada y transferible de 6 años. Cupos limitados este mes.</p>
          </div>
          <div>
            <ul className="space-y-2 mb-5 text-sm text-zinc-200">
              {[
                "Cerámico System X en cada panel pintado, dureza 9H, certificado por laboratorio SGS",
                "Recubrimiento de vidrios en el parabrisas y todas las ventanas, sin costo",
                "Recubrimiento de los cuatro rines, sin costo",
                "Inspección panel por panel bajo luces antes de pagar el saldo",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#E85D04] mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
            <a href="#cotizar" data-cta="es-ceramic-promo-card" className="cta w-full inline-flex items-center justify-center gap-2 bg-[#E85D04] text-black font-['Bebas_Neue',sans-serif] text-xl md:text-2xl tracking-[0.1em] uppercase px-6 py-4 hover:bg-orange-600 transition-colors">
              Aparte su cupo <ArrowRight className="w-5 h-5" />
            </a>
            <LeadPulse lang="es" className="mt-3" />
            <p className="text-zinc-500 text-xs mt-3 text-center"><Link href="/promo-ceramic" className="underline underline-offset-2 hover:text-white">Ver el especial en inglés</Link></p>
          </div>
        </aside>
      </div>
    </section>
  );
}
