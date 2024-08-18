import { Carousel } from "@material-tailwind/react";
import Slide from "./Slide";
 
export default function Slider() {
  let slides = [
    {
      video: "Map.mp4",
      text: "Build a map of countries you've been and wish to visit"
    }, 
    {
      video: "Cities.mp4",
      text: "Add over 18k territories, cities, regions, provinces and states"
    },
    {
      video: "Statistic.mp4",
      text: "Track your travel stats"
    }
  ]

  return (
    <Carousel transition={{ duration: 1 }}>
    {slides.map(({video, text}) => (
      <Slide video={video} text={text} key={text} />
    ))}
    </Carousel>
  );
}
