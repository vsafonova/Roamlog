import HomePageSection from "../../components/desktopSections/HomePageSection";
import Footer from "../../components/desktopSections/Footer";
import Slider from "../../components/slider/desktop/Slider";

export default function HomePage() {
  return (
    <>
      <Slider />
      <HomePageSection
        vectorImage="Map.svg"
        heading="Mark the countries you've been"
        paragraph="Create your own scratch map in seconds added over 18k countries"
        image="Screen.png"
        alt="Phone screen with map and colored countries on it"
        justifyContent="justify-center"
      />
      <HomePageSection
        vectorImage="Earth.svg"
        heading="Create your travel bucket list"
        paragraph="Easily keep track of places you've visited and want to visit in the future"
        backgroundImage={{
          backgroundImage: "url('/images/BucketList.png')",
          backgroundSize: "cover",
          paddingBottom: "20%",
          paddingLeft: "55%",
        }}
        justifyContent="justify-end"
        textColor={"text-white"}
      />
      <HomePageSection
        vectorImage="Cup.svg"
        heading="Track your travels"
        paragraph="Track your travel stats"
        image=""
        alt=""
        justifyContent={"justify-center"}
      />
      <Footer />
    </>
  );
}
