import AboutSection from "@/components/about-section";
import GameComponent from "@/components/game/game-component";
import Patchlog from "@/components/patchlog";
import Roadmap from "@/components/roadmap";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full mx-auto">
      <GameComponent />
      <AboutSection />
      <div className="flex flex-col md:flex-row items-center justify-evenly w-full h-fit mt-3 mb-8">
        <Patchlog />
        <Roadmap />
      </div>
    </div>
  );
}
