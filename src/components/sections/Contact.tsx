import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeftRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  CircleAlert,
  Clock,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { cn } from "../../utils/cn";

gsap.registerPlugin(ScrollTrigger);

export const WHATSAPP_NUMBER = "+584120753682";

const WA_NUMBER = WHATSAPP_NUMBER.replace(/\D/g, "");

const SERVICE_OPTIONS = [
  "Taxi Express",
  "Transporte Escolar",
  "Transporte Universitario",
  "Transporte Empresarial",
] as const;

const EXPRESS_SERVICE = "Taxi Express";

const TIMING_OPTIONS = ["Inmediato", "Mensual", "Quincenal"] as const;
const EXPRESS_TIMING_OPTIONS = ["Inmediato"] as const;
const RECURRING_TIMING_OPTIONS = ["Mensual", "Quincenal"] as const;

const METHOD_OPTIONS = ["Pago móvil", "Divisas (dólares)"] as const;

type FormState = {
  service: string;
  timing: string;
  method: string;
  origin: string;
  destination: string;
  schedule: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  service: EXPRESS_SERVICE,
  timing: EXPRESS_TIMING_OPTIONS[0],
  method: METHOD_OPTIONS[0],
  origin: "",
  destination: "",
  schedule: "",
  notes: "",
};

const TRUST_ITEMS = [
  {
    icon: Clock,
    text: "Respuesta el mismo día en horario de atención.",
  },
  {
    icon: BadgeCheck,
    text: "Cotizamos antes de reservar: sin compromiso ni adelanto.",
  },
  {
    icon: MessageCircle,
    text: "Coordinas cada detalle por WhatsApp, sin llamadas.",
  },
];

const buildMessage = (form: FormState) => {
  const value = (v: string) => v.trim() || "—";
  const timing =
    form.timing === "Inmediato" ? "Inmediato (pago por viaje)" : form.timing;

  const lines = [
    "*Solicitud de cotización — NovaDrive*",
    "",
    `• *Servicio:* ${value(form.service)}`,
    `• *Tipo de pago:* ${value(timing)}`,
    `• *Método de pago:* ${value(form.method)}`,
    `• *Origen:* ${value(form.origin)}`,
    `• *Destino:* ${value(form.destination)}`,
    `• *Horario:* ${value(form.schedule)}`,
  ];

  if (form.notes.trim()) {
    lines.push(`• *Descripción:* ${form.notes.trim()}`);
  }

  lines.push("", "Quedo atento/a a su confirmación. ¡Gracias!");

  return lines.join("\n");
};

const validate = (form: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!form.service) errors.service = "Selecciona el tipo de servicio.";
  if (!form.timing) errors.timing = "Indica la forma de pago.";
  if (!form.method) errors.method = "Elige el método de pago.";
  if (!form.origin.trim()) errors.origin = "Indica el punto de partida.";
  if (!form.destination.trim())
    errors.destination = "Indica el destino del traslado.";
  if (!form.schedule.trim())
    errors.schedule = "Indica la fecha y el horario.";

  return errors;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fieldBase =
  "w-full rounded-xl border bg-neutral-950/70 px-4 py-3.5 text-base leading-normal text-gray-50 placeholder:text-neutral-400 outline-none transition-colors duration-200 focus:border-lime-300";

const labelBase =
  "cursor-pointer rounded-full border px-4 py-3 text-sm leading-none transition-colors duration-200 sm:px-4.5 sm:py-2.5 sm:text-base";

export const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const isExpress = form.service === EXPRESS_SERVICE;

  const message = useMemo(() => buildMessage(form), [form]);
  const hasPreview = Boolean(
    form.service ||
      form.origin.trim() ||
      form.destination.trim() ||
      form.schedule.trim()
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([headerRef.current, cardRef.current], {
          opacity: 1,
          y: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.08,
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 92%",
                once: true,
              },
            }
          );
        }
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const update = (patch: Partial<FormState>, field?: keyof FormState) => {
    setForm((current) => ({ ...current, ...patch }));
    if (field) {
      setErrors((current) => {
        if (!current[field]) return current;
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const handleService = (service: string) => {
    let timing = form.timing;

    if (service === EXPRESS_SERVICE) {
      timing = "Inmediato";
    } else if (timing === "Inmediato") {
      timing = "";
    }

    setForm((current) => ({ ...current, service, timing }));
    setErrors((current) => {
      const next = { ...current };
      delete next.service;
      if (timing) delete next.timing;
      return next;
    });
  };

  const swapRoute = () => {
    setForm((current) => ({
      ...current,
      origin: current.destination,
      destination: current.origin,
    }));
  };

  const focusFirstError = (current: FormErrors) => {
    const order: (keyof FormState)[] = [
      "service",
      "timing",
      "method",
      "origin",
      "destination",
      "schedule",
    ];

    const first = order.find((key) => current[key]);
    if (!first) return;

    const group = document.querySelector<HTMLElement>(`[data-field="${first}"]`);
    const target = group?.querySelector<HTMLElement>("input, textarea") ?? group;

    target?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "center",
    });
    target?.focus({ preventScroll: true });
  };

  const openWhatsApp = (current: FormState) => {
    const text = encodeURIComponent(buildMessage(current));
    const base = WA_NUMBER
      ? `https://wa.me/${WA_NUMBER}`
      : "https://wa.me/";
    const url = `${base}?text=${text}`;

    setSentUrl(url);

    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentErrors = validate(form);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length > 0) {
      focusFirstError(currentErrors);
      return;
    }

    openWhatsApp(form);
  };

  const errorText = (key: keyof FormErrors) =>
    errors[key] ? (
      <p
        id={`contact-error-${key}`}
        className="mt-2 flex items-center gap-1.5 text-sm text-red-400"
      >
        <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
        {errors[key]}
      </p>
    ) : null;

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="bg-neutral-900 py-20 text-gray-50 md:py-24 lg:py-36 xl:py-46"
      aria-labelledby="contact-title"
    >
      <div className="grid w-full grid-cols-[0.05fr_1fr_0.05fr] md:grid-cols-[0.05fr_2fr_0.05fr]">
        <div />

        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16 lg:gap-28 xl:gap-32">
          {/* LEFT / STICKY */}
          <div className="w-full md:w-[38%]">
            <div ref={headerRef} className="md:sticky md:top-24">
              <h2
                id="contact-title"
                className="text-4xl leading-none tracking-tighter sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"
              >
                Cuéntanos tu viaje y te respondemos{" "}
                <span className="font-instrument italic text-lime-300">
                  por WhatsApp.
                </span>
              </h2>

              <p className="mt-7 max-w-lg text-sm leading-relaxed sm:leading-normal text-neutral-400 xs:text-base font-light lg:text-lg">
                Completa el formulario con los datos de tu traslado. Tu
                solicitud llega directo a nuestro equipo y te confirmamos
                disponibilidad, precio y horario.
              </p>

              <ul className="mt-8 flex flex-col gap-4">
                {TRUST_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.text}
                      className="flex items-center gap-3 text-sm leading-normal text-neutral-300 sm:text-base"
                    >
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-lime-300/10 text-lime-300">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      {item.text}
                    </li>
                  );
                })}
              </ul>

              <a
                href={
                  WA_NUMBER
                    ? `https://wa.me/${WA_NUMBER}`
                    : "https://wa.me/"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 text-base font-medium tracking-tight text-gray-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:text-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:px-6 sm:py-3"
              >
                <span className="leading-none">Escríbenos directo</span>
                <ArrowUpRight className="size-4.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-5" />
              </a>
            </div>
          </div>

          {/* RIGHT / FORM */}
          <div ref={cardRef} className="w-full md:w-[62%]">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-2xl bg-black p-6 sm:p-8 lg:p-10"
            >
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <h3 className="text-2xl tracking-tighter sm:text-3xl lg:text-4xl">
                  Solicita tu{" "}
                  <span className="font-instrument italic text-lime-300">
                    cotización
                  </span>
                </h3>
                <p className="text-sm text-neutral-400">
                  Menos de 2 minutos · Sin registro
                </p>
              </div>

              {/* TIPO DE SERVICIO */}
              <fieldset
                data-field="service"
                aria-describedby={
                  errors.service ? "contact-error-service" : undefined
                }
                className="mt-8"
              >
                <legend className="text-base font-medium tracking-tight text-neutral-200">
                  Tipo de servicio
                </legend>
                <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
                  {SERVICE_OPTIONS.map((option) => {
                    const checked = form.service === option;
                    return (
                      <label
                        key={option}
                        className={cn(
                          labelBase,
                          checked
                            ? "border-lime-300 bg-lime-300 font-medium text-black"
                            : "border-neutral-700 text-neutral-300 hover:border-neutral-400 hover:text-gray-50",
                          "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-lime-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={option}
                          checked={checked}
                          onChange={() => handleService(option)}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
                {errorText("service")}
              </fieldset>

              {/* TIPO DE PAGO */}
              <fieldset
                data-field="timing"
                aria-describedby={
                  errors.timing ? "contact-error-timing" : undefined
                }
                className="mt-7"
              >
                <legend className="text-base font-medium tracking-tight text-neutral-200">
                  Tipo de pago
                </legend>
                <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
                  {(isExpress
                    ? EXPRESS_TIMING_OPTIONS
                    : !form.service
                      ? TIMING_OPTIONS
                      : RECURRING_TIMING_OPTIONS
                  ).map((option) => {
                    const checked = form.timing === option;
                    return (
                      <label
                        key={option}
                        className={cn(
                          labelBase,
                          checked
                            ? "border-lime-300 bg-lime-300 font-medium text-black"
                            : "border-neutral-700 text-neutral-300 hover:border-neutral-400 hover:text-gray-50",
                          "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-lime-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="timing"
                          value={option}
                          checked={checked}
                          onChange={() =>
                            update({ timing: option }, "timing")
                          }
                          className="sr-only"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>

                {isExpress ? (
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-lime-300">
                    <Check className="size-4 shrink-0" aria-hidden="true" />
                    El traslado express solo cuenta con pago inmediato.
                  </p>
                ) : (
                  form.service && (
                    <p className="mt-3 text-sm text-neutral-400">
                      Las rutas programadas se pagan mensual o cada 15 días.
                    </p>
                  )
                )}
                {errorText("timing")}
              </fieldset>

              {/* MÉTODO DE PAGO */}
              <fieldset
                data-field="method"
                aria-describedby={
                  errors.method ? "contact-error-method" : undefined
                }
                className="mt-7"
              >
                <legend className="text-base font-medium tracking-tight text-neutral-200">
                  Método de pago
                </legend>
                <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
                  {METHOD_OPTIONS.map((option) => {
                    const checked = form.method === option;
                    return (
                      <label
                        key={option}
                        className={cn(
                          labelBase,
                          checked
                            ? "border-lime-300 bg-lime-300 font-medium text-black"
                            : "border-neutral-700 text-neutral-300 hover:border-neutral-400 hover:text-gray-50",
                          "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-lime-300"
                        )}
                      >
                        <input
                          type="radio"
                          name="method"
                          value={option}
                          checked={checked}
                          onChange={() =>
                            update({ method: option }, "method")
                          }
                          className="sr-only"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
                {errorText("method")}
              </fieldset>

              {/* RUTA */}
              <div className="mt-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div data-field="origin">
                    <label
                      htmlFor="contact-origin"
                      className="block text-base font-medium tracking-tight text-neutral-200"
                    >
                      Origen
                    </label>
                    <div className="relative mt-3">
                      <MapPin
                        className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-neutral-400"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-origin"
                        name="origin"
                        type="text"
                        autoComplete="off"
                        placeholder="Barrio, avenida o punto de referencia"
                        value={form.origin}
                        aria-invalid={Boolean(errors.origin)}
                        aria-describedby={
                          errors.origin ? "contact-error-origin" : undefined
                        }
                        onChange={(event) =>
                          update({ origin: event.target.value }, "origin")
                        }
                        className={cn(
                          "placeholder:text-sm md:placeholder:text-base",
                          fieldBase,
                          "pl-11",
                          errors.origin && "border-red-500/70"
                        )}
                      />
                    </div>
                    {errorText("origin")}
                  </div>

                  <div data-field="destination">
                    <label
                      htmlFor="contact-destination"
                      className="block text-base font-medium tracking-tight text-neutral-200"
                    >
                      Destino
                    </label>
                    <div className="relative mt-3">
                      <MapPin
                        className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-lime-300"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-destination"
                        name="destination"
                        type="text"
                        autoComplete="off"
                        placeholder="A dónde te diriges"
                        value={form.destination}
                        aria-invalid={Boolean(errors.destination)}
                        aria-describedby={
                          errors.destination
                            ? "contact-error-destination"
                            : undefined
                        }
                        onChange={(event) =>
                          update(
                            { destination: event.target.value },
                            "destination"
                          )
                        }
                        className={cn(
                          "placeholder:text-sm md:placeholder:text-base",
                          fieldBase,
                          "pl-11",
                          errors.destination && "border-red-500/70"
                        )}
                      />
                    </div>
                    {errorText("destination")}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={swapRoute}
                  className="mt-3 inline-flex items-center gap-1.5 py-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                >
                  <ArrowLeftRight className="size-4" aria-hidden="true" />
                  Intercambiar origen y destino
                </button>
              </div>

              {/* HORARIO */}
              <div data-field="schedule" className="mt-5">
                <label
                  htmlFor="contact-schedule"
                  className="block text-base font-medium tracking-tight text-neutral-200"
                >
                  Fecha y horario
                </label>
                <div className="relative mt-3">
                  <Clock
                    className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-neutral-400"
                    aria-hidden="true"
                  />
                  <input
                    id="contact-schedule"
                    name="schedule"
                    type="text"
                    autoComplete="off"
                    placeholder="Ej: Hoy 4:00pm o Lun a Vie 7:00am"
                    value={form.schedule}
                    aria-invalid={Boolean(errors.schedule)}
                    aria-describedby={
                      errors.schedule ? "contact-error-schedule" : undefined
                    }
                    onChange={(event) =>
                      update({ schedule: event.target.value }, "schedule")
                    }
                    className={cn(
                      "placeholder:text-sm md:placeholder:text-base",
                      fieldBase,
                      "pl-11",
                      errors.schedule && "border-red-500/70"
                    )}
                  />
                </div>
                {errorText("schedule")}
              </div>

              {/* DESCRIPCIÓN */}
              <div className="mt-5">
                <label
                  htmlFor="contact-notes"
                  className="block text-base font-medium tracking-tight text-neutral-200"
                >
                  Descripción{" "}
                  <span className="font-normal text-neutral-400">
                    (opcional)
                  </span>
                </label>
                <textarea
                  id="contact-notes"
                  name="notes"
                  rows={3}
                  placeholder="Pasajeros, equipaje, paradas o cualquier detalle extra."
                  value={form.notes}
                  onChange={(event) =>
                    update({ notes: event.target.value }, "notes")
                  }
                  className={cn("placeholder:text-sm md:placeholder:text-base",fieldBase, "mt-3 resize-y")}
                />
              </div>

              {/* PREVIEW */}
              {hasPreview && (
                <div className="mt-7 rounded-xl border border-dashed border-neutral-800 bg-neutral-950/60 p-4 sm:p-5">
                  <p className="text-xs text-neutral-400">
                    Así recibirá tu mensaje nuestro equipo:
                  </p>
                  <p className="mt-2.5 whitespace-pre-line text-sm leading-relaxed text-neutral-300">
                    {message}
                  </p>
                </div>
              )}

              {/* SUBMIT */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-4 text-base font-medium tracking-tight text-black outline-2 outline-offset-3 outline-transparent transition-all duration-300 hover:-translate-y-0.5 hover:outline-lime-300 focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-lg"
                >
                  <span className="leading-none">
                    Enviar solicitud por WhatsApp
                  </span>
                  <ArrowUpRight className="size-5 transition-transform duration-300 ease-out sm:size-5.5" />
                </button>

                <p className="mt-3 text-center text-xs leading-relaxed text-neutral-400 sm:text-sm">
                  Se abrirá WhatsApp con tu mensaje listo para enviar. Nuestro
                  equipo lo confirma contigo.
                </p>

                {sentUrl && (
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-lime-300">
                    <Check className="size-4 shrink-0" aria-hidden="true" />
                    <a
                      href={sentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 transition-colors duration-200 hover:text-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                    >
                      ¿No se abrió? Vuelve a abrir WhatsApp
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        <div />
      </div>
    </section>
  );
};

export default Contact;
