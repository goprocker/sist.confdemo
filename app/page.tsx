import Hero from "@/components/sections/Hero";
import ChancellorMessage from "@/components/sections/ChancellorMessage";
import AboutSection from "@/components/sections/AboutSection";
import WhyAttendSection from "@/components/sections/WhyAttendSection";
import TracksPreviewSection from "@/components/sections/TracksPreviewSection";
import SpeakersPreviewSection from "@/components/sections/SpeakersPreviewSection";
import StatsStrip from "@/components/sections/StatsStrip";
import TimelineSection from "@/components/sections/TimelineSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Hero />
      <ChancellorMessage />
      <AboutSection />
      <StatsStrip />
      <WhyAttendSection />
      <TracksPreviewSection />
      <SpeakersPreviewSection />
      <TimelineSection />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </div>
  );
}





