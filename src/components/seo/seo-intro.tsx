"use client";

import { useI18n } from "@/lib/i18n/context";

export function VdotSeoIntro() {
  const { locale } = useI18n();
  const text =
    locale === "hi"
      ? "यह मुफ्त VDOT कैलकुलेटर आपकी हाल की दौड़ से फिटनेस स्कोर निकालता है और मैराथन, हाफ मैराथन, 10K या 5K के लिए समतुल्य समय दिखाता है। परिणाम से प्रशिक्षण गति और रेस-दिवस स्प्लिट प्लान करें।"
      : "This free VDOT calculator estimates your running fitness from a recent race and shows equivalent times for marathon, half marathon, 10K, and 5K. Use the results to set training paces and plan race-day kilometer splits.";

  return (
    <p className="text-sm text-muted leading-relaxed mb-6 max-w-xl">{text}</p>
  );
}
