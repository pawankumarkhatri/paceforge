"use client";

import { seoFaqCopy, type FaqItem } from "@/lib/seo-faq";
import { useI18n } from "@/lib/i18n/context";

type FaqSection = "home" | "vdot";

export function SeoFaq({ section }: { section: FaqSection }) {
  const { locale } = useI18n();
  const copy = seoFaqCopy[locale];
  const title = section === "home" ? copy.homeTitle : copy.vdotTitle;
  const items: FaqItem[] = section === "home" ? copy.home : copy.vdot;

  return (
    <section className="mt-12 border-t border-border pt-10" aria-labelledby={`faq-${section}`}>
      <h2 id={`faq-${section}`} className="font-display text-xl font-bold text-foreground mb-6">
        {title}
      </h2>
      <dl className="space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-display font-bold text-foreground text-[0.95rem] leading-snug">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm text-muted leading-relaxed">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
