import { Suspense } from "react";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import { LoadingFallback } from "./components/LoadingFallback";

export default function Home() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <TechStack />
      </Suspense>
    </>
  );
}
