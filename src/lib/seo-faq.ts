export type FaqItem = { question: string; answer: string };

export const seoFaqCopy = {
  en: {
    homeTitle: "Frequently asked questions",
    vdotTitle: "VDOT calculator — common questions",
    home: [
      {
        question: "What is PaceForge?",
        answer:
          "PaceForge is a free running planner that turns a recent race result into a VDOT fitness score, training paces, and race-day tools such as kilometer splits and a printable pace band. It works in your browser on phone or desktop.",
      },
      {
        question: "Is PaceForge free?",
        answer: "Yes. PaceForge is free to use. No account is required. Your plan data stays on your device for the current session.",
      },
      {
        question: "What is VDOT?",
        answer:
          "VDOT is a number that estimates your aerobic fitness from a race time (Jack Daniels method). We use it to suggest equivalent times at other distances and daily training paces.",
      },
      {
        question: "Does PaceForge work in Hindi?",
        answer:
          "Yes. Use the English / हिन्दी switch in the header to read guides and navigation in Hindi while using the same calculators.",
      },
    ] satisfies FaqItem[],
    vdot: [
      {
        question: "How do I calculate VDOT?",
        answer:
          "Enter the distance and finish time of a recent race or hard time trial (ideally within the last few months). PaceForge returns your VDOT and a table of equivalent finish times at standard distances.",
      },
      {
        question: "Which race should I use for VDOT?",
        answer:
          "Pick a race you ran all-out on a fair course. A 5K, 10K, half marathon, or marathon all work. Shorter races emphasize speed; longer races emphasize endurance.",
      },
      {
        question: "How accurate are VDOT predictions?",
        answer:
          "VDOT gives useful estimates for training—not guarantees. Hills, heat, course difficulty, and fitness changes since the race all matter. Adjust goal times for race day conditions.",
      },
      {
        question: "What should I do after I get my VDOT?",
        answer:
          "Open Training for workout paces and heart-rate zones, or Race day for splits, a lock-screen pace band, and a fueling plan based on your goal time.",
      },
    ] satisfies FaqItem[],
  },
  hi: {
    homeTitle: "अक्सर पूछे जाने वाले प्रश्न",
    vdotTitle: "VDOT कैलकुलेटर — सामान्य प्रश्न",
    home: [
      {
        question: "PaceForge क्या है?",
        answer:
          "PaceForge एक मुफ्त रनिंग प्लानर है जो हाल की दौड़ के परिणाम से VDOT स्कोर, प्रशिक्षण गति और रेस-दिवस उपकरण (स्प्लिट, पेस बैंड) बनाता है। यह फोन या डेस्कटॉप ब्राउज़र में चलता है।",
      },
      {
        question: "क्या PaceForge मुफ्त है?",
        answer: "हाँ। खाते की ज़रूरत नहीं। सत्र का डेटा आपके डिवाइस पर रहता है।",
      },
      {
        question: "VDOT क्या है?",
        answer:
          "VDOT दौड़ के समय से एरोबिक फिटनेस का अनुमान है (Jack Daniels विधि)। इससे अन्य दूरियों के समय और प्रशिक्षण गति सुझते हैं।",
      },
      {
        question: "क्या हिन्दी में उपलब्ध है?",
        answer: "हाँ। हेडर में English / हिन्दी से मार्गदर्शन और नेविगेशन हिन्दी में पढ़ सकते हैं।",
      },
    ] satisfies FaqItem[],
    vdot: [
      {
        question: "VDOT कैसे गणना करें?",
        answer:
          "हाल की दौड़ या कठिन टाइम ट्रायल की दूरी और समापन समय दर्ज करें। PaceForge VDOT और मानक दूरियों पर समतुल्य समय दिखाता है।",
      },
      {
        question: "कौन सी दौड़ चुनें?",
        answer:
          "पूरी ताकत से दौड़ी गई, साफ कोर्स की दौड़ चुनें। 5K, 10K, हाफ या मैराथन सभी चलते हैं।",
      },
      {
        question: "अनुमान कितने सटीक हैं?",
        answer:
          "VDOT प्रशिक्षण के लिए उपयोगी अनुमान देता है—गारंटी नहीं। ढलान, गर्मी और कोर्स असर डालते हैं।",
      },
      {
        question: "VDOT के बाद क्या करें?",
        answer: "प्रशिक्षण में गति और HR ज़ोन, रेस दिवस में स्प्लिट, पेस बैंड और फ्यूलिंग खोलें।",
      },
    ] satisfies FaqItem[],
  },
} as const;
