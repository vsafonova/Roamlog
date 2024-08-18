import { Carousel } from "@material-tailwind/react";
import Slide from "./Slide";
 
export default function Slider() {
  let slides = [
    {
      gif: "Map.gif",
      text: "Build a map of countries you've been and wish to visit",
      altText: "World map with colored countries by user"
    }, 
    {
      gif: "Cities.gif",
      text: "Add over 18k territories, cities, regions, provinces and states",
      altText: "Country map with cities and territories marked by pins"
    },
    {
      gif: "Statistics.gif",
      text: "Track your travel stats",
      altText: "User's travel statistics with percentage of countries visited"
    }
  ]

  return (
    <Carousel transition={{ duration: 1 }}>
    {slides.map(({gif, text, altText}) => (
      <Slide gif={gif} text={text} altText={altText} key={text} />
    ))}
    </Carousel>
  );
}
