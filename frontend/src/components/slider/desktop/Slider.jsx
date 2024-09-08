import { Carousel, ThemeProvider } from "@material-tailwind/react";
import Slide from "./Slide";
import theme from "./theme";
import NavBar from "./NavBar";

export default function Slider() {
  let slides = [
    {
      gif: "MapDesktop.gif",
      text: "Build a map of countries you've been and wish to visit",
      altText: "World map with colored countries by user",
    },
    // {
    //   gif: "Cities.gif",
    //   text: "Mark over 18k cities, states & regions",
    //   altText: "Country map with cities and territories marked by pins",
    // },
    {
      gif: "StatisticsDesktop.gif",
      text: "Track your travels for personalized insights and inspiration",
      altText: "User's travel statistics with percentage of countries visited",
    },
  ];

  return (
    <ThemeProvider value={theme}>
      <Carousel transition={{ duration: 1 }}>
        {slides.map(({ gif, text, altText }) => (
          <div key={text}>
            <NavBar />
            <Slide gif={gif} text={text} altText={altText} />
          </div>
        ))}
      </Carousel>
    </ThemeProvider>
  );
}
