import { AboutLinks } from "./components/profile-links.component";
import { alice } from "@/pages";
import AboutImage from "./components/profile-image.component";

export default function About() {
  return (
    <>
      <div className="bg-white">
        <div
          className={`${alice.className} h-screen grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 mx-12 place-items-center `}
          id="aboutme"
        >
          <div className="order-last md:order-last lg:order-first xl:order-first 2xl:order-first">
            <AboutLinks />
          </div>

          <div className="px-4 justify-self-center max-w-[500px] order-first md:order-first lg:order-last xl:order-last 2xl:order-last relative flex items-end justify-end">
            <AboutImage />
          </div>
        </div>
      </div>
    </>
  );
}
