import AboutSection from "@/components/sections/AboutSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ActivitiesSection from "@/components/sections/ActivitiesSection";
import ResumeSection from "@/components/sections/ResumeSection";

export default function AboutPage() {
  return (
    <div className="pt-24 flex flex-col items-center w-full">
      <AboutSection />
      <AchievementsSection />
      <ActivitiesSection />
      <ResumeSection />
    </div>
  );
}
