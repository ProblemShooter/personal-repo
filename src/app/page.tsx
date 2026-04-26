"use client";

import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />
      
      {/* Previews of other pages */}
      <SkillsSection preview={false} />

      <ProjectsSection preview={false} />
      
      <ExperienceSection preview={false} />

      <ContactSection />
    </>
  );
}
