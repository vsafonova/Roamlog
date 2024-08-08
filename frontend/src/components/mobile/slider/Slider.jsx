import { Carousel } from "@material-tailwind/react";
import Slide from "./Slide";
 
export default function Slider() {
  let slides = [
    {
      video: "Map.mp4",
      text: "Build a map of countries you've visited and wish to visit"
    }, 
    {
      video: "Cities.mp4",
      text: "Mark over 18k cities, states & regions"
    },
    {
      video: "Statistic.mp4",
      text: "Track the percentage of each continent you've explored"
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
