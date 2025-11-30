import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { AboutPage } from "./About";
import { FaqSection } from "@/components/modules/homepage/FaqSection";
import { ContactSection } from "@/components/modules/homepage/ContactSection";
import { TestimonialSection } from "@/components/modules/homepage/TestimonialsSection";
import { ServiceSection } from "@/components/modules/homepage/ServiceSection";

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <ServiceSection />
      <FaqSection />
      <AboutPage />
      <TestimonialSection />
      <ContactSection />
    </div>
  );
}
