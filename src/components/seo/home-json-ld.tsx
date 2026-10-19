import { siteUrl } from "@/lib/site-url";

export function HomeJsonLd() {
  const url = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PaceForge",
    url: `${url}/`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description:
      "VDOT calculator, training paces, race-day splits, pace band export. English and Hindi. Mobile PWA.",
    inLanguage: ["en", "hi"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
