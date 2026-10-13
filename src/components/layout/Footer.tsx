import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowUp, MapPin, MessageCircle } from "lucide-react";
import {
  BrandLogo,
  WhatsAppIcon,
  InstagramIcon,
  TikTokIcon,
} from "../ui/Icons";
import { SOCIAL_LINKS } from "../../config/socialLinks";
import { useLegal } from "../legal/legal-context";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Preguntas frecuentes", href: "#preguntas-frecuentes" },
  { label: "Contacto", href: "#contacto" },
];

const waChatHref = SOCIAL_LINKS.whatsapp;
const socials = [
  {
    name: "WhatsApp",
    href: SOCIAL_LINKS.whatsapp,
    Icon: WhatsAppIcon,
  },
  { name: "Instagram", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { name: "TikTok", href: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
];

export const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const { openLegal } = useLegal();

  useEffect(() => {
    const root = footerRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-anim]")
    );

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: index * 0.08,
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                once: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-neutral-900 py-20 text-gray-50 md:py-24 lg:py-28"
    >
      <div className="grid w-full grid-cols-[0.05fr_1fr_0.05fr] md:grid-cols-[0.05fr_2fr_0.05fr]">
        <div />

        <div className="flex flex-col gap-16 lg:gap-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
            {/* BRAND */}
            <div data-anim className="sm:col-span-2 lg:col-span-4">
              <a
                href="#inicio"
                className="group inline-flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
              >
                <span className="text-lime-300 transition-transform duration-300 ease-out group-hover:-rotate-6">
                  <BrandLogo size={28} />
                </span>
                <span className="text-2xl font-[450] leading-none tracking-tight text-gray-50">
                  NOVA<span className="text-lime-300">DRIVE</span>
                </span>
              </a>

              <p className="mt-5 max-w-xs text-sm leading-normal text-neutral-400 font-light">
                Transporte cómodo, puntual y adaptado a tus horarios. Traslados
                express y rutas programadas para estudiantes y empresas.
              </p>

              <a
                href="#contacto"
                className="group mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-lime-300 px-5 py-2.5 pr-4 text-base font-medium tracking-tight text-black outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:-translate-y-0.5 hover:outline-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              >
                <span className="leading-none">Cotizar traslado</span>
                <ArrowUpRight className="size-4.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* NAVEGACIÓN */}
            <nav data-anim aria-label="Enlaces del sitio" className="lg:col-span-3">
              <h3 className="text-sm uppercase text-neutral-500">
                Explorar
              </h3>
              <ul className="mt-6 flex flex-col items-start gap-3.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-1.5 text-base text-gray-50 transition-colors duration-200 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
                    >
                      {item.label}
                      <ArrowUpRight className="size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CONTACTO */}
            <div data-anim className="lg:col-span-3">
              <h3 className="text-sm uppercase text-neutral-500">
                Contacto
              </h3>
              <ul className="mt-6 flex flex-col items-start gap-3.5">
                <li>
                  {waChatHref ? (
                    <a
                      href={waChatHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-base transition-colors duration-200 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
                    >
                      <MessageCircle className="size-4.5 shrink-0 text-lime-300" />
                      Escríbenos por WhatsApp
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-base">
                      <MessageCircle className="size-4.5 shrink-0 text-lime-300" />
                      Escríbenos por WhatsApp
                    </span>
                  )}
                </li>
                <li className="flex items-center gap-2 text-base text-gray-50">
                  <MapPin className="size-4.5 shrink-0 text-lime-300" />
                  Maracaibo, Zulia
                </li>
              </ul>
            </div>

            {/* REDES */}
            <div data-anim className="lg:col-span-2">
              <h3 className="text-sm uppercase text-neutral-500">
                Redes
              </h3>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {socials.map(({ name, href, Icon }) => {
                  const base =
                    "grid size-11 place-items-center rounded-full border border-white/15 transition-all duration-200";
                  return href ? (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className={`${base} hover:-translate-y-0.5 hover:border-lime-300 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300`}
                    >
                      <Icon size={20} />
                    </a>
                  ) : (
                    <span
                      key={name}
                      aria-hidden="true"
                      title={`Configura la URL de ${name} en SOCIAL_LINKS`}
                      className={`${base} opacity-40`}
                    >
                      <Icon size={20} />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div
            data-anim
            className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between lg:pt-10"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm text-neutral-500">
                © {new Date().getFullYear()} NovaDrive. Todos los derechos
                reservados.
              </p>
              <p className="text-sm text-neutral-500">
                Desarrollado por{" "}
                <a
                  href="https://github.com/DevPyGabriel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors duration-200 hover:text-lime-300 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
                >
                  Gabriel Fernández
                </a>
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                onClick={() => openLegal("terminos")}
                className="cursor-pointer text-sm text-neutral-400 transition-colors duration-200 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
              >
                Términos y Condiciones
              </button>
              <button
                type="button"
                onClick={() => openLegal("privacidad")}
                className="cursor-pointer text-sm text-neutral-400 transition-colors duration-200 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
              >
                Política de Privacidad y Cookies
              </button>
            </div>

            <a
              href="#inicio"
              className="group inline-flex w-fit items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300"
            >
              Volver arriba
              <ArrowUp className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div />
      </div>
    </footer>
  );
};