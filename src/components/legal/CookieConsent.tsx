import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Cookie } from "lucide-react";
import { useLegal } from "./legal-context";

const STORAGE_KEY = "nova_cookie_consent";

type Consent = "accepted" | "rejected" | null;

const readConsent = (): Consent => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  } catch {
    return null;
  }
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const CookieConsent = () => {
  const [consent, setConsent] = useState<Consent>(readConsent);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { openLegal } = useLegal();

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner || consent !== null) return;

    if (prefersReducedMotion()) {
      gsap.set(banner, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        banner,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.6,
          clearProps: "transform",
        }
      );
    }, banner);

    return () => ctx.revert();
  }, [consent]);

  if (consent !== null) return null;

  const choose = (value: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // almacenamiento no disponible: ocultamos el banner igualmente
    }
    setConsent(value);
  };

  return (
    <div
      ref={bannerRef}
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-neutral-900 p-4 shadow-2xl sm:inset-x-4 sm:bottom-6 sm:p-6"
    >
      <div className="flex items-start gap-3 sm:gap-3.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-lime-300/10 text-lime-300 sm:size-10">
          <Cookie className="size-4 sm:size-5" aria-hidden="true" />
        </span>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="flex-1">
            <p className="text-sm leading-snug text-neutral-200 sm:text-base sm:leading-relaxed">
              <span className="sm:hidden">
                Usamos cookies para mejorar tu experiencia.{" "}
              </span>
              <span className="hidden sm:inline">
                Usamos cookies para que la página funcione y, en su caso,
                medir su uso. Puedes aceptarlas o rechazarlas. Más información
                en nuestra{" "}
              </span>
              <button
                type="button"
                onClick={() => openLegal("privacidad")}
                className="cursor-pointer text-lime-300 underline underline-offset-4 transition-colors duration-200 hover:text-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
              >
                <span className="sm:hidden">Más información</span>
                <span className="hidden sm:inline">
                  Política de Privacidad y Cookies
                </span>
              </button>
              .
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2.5 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="flex-1 rounded-full border border-white/15 px-4 py-2 text-sm font-medium tracking-tight text-neutral-200 transition-colors duration-200 hover:border-lime-300 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 sm:flex-none"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="flex-1 rounded-full bg-lime-300 px-4 py-2 text-sm font-medium tracking-tight text-black outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:-translate-y-0.5 hover:outline-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:flex-none"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};