import { initTWE, Carousel, Ripple } from "tw-elements";
initTWE({ Carousel, Ripple });
import "/node_modules/tw-elements/css/tw-elements.min.css";
import { useEffect } from "react";
import SliderIndicator from "./SliderIndicator";
import Slide from "./Slide";
import Buttons from "./Buttons";

export default function Slider() {
  useEffect(() => {
    initTWE({ Carousel, Ripple });
  }, []);

  let slides = [
    {
      video: "Map.mp4",
      mainText: "Build a map of countries you've visited and wish to visit",
      slideTo: "0",
      ariaLabel: "Slide 1",
    },
    {
      video: "Cities.mp4",
      mainText: "Mark over 18k cities, states & regions",
      slideTo: "1",
      ariaLabel: "Slide 2",
    },
    {
      video: "Statistic.mp4",
      mainText: "Get statistics on your travels to track your travel life",
      slideTo: "2",
      ariaLabel: "Slide 3",
    },
  ];

  return (
    <div
      id="carouselExampleCaptionsFull"
      className="relative"
      data-twe-carousel-init
      data-twe-ride="carousel"
    >
      {slides.map(({ slideTo, ariaLabel }) => (
        <SliderIndicator
          key={slideTo}
          slideTo={slideTo}
          ariaLabel={ariaLabel}
        />
      ))}
      <div className="relative after:clear-both after:block after:content-['']">
        {slides.map(({ video, mainText }, index) => (
          <Slide key={index} video={video} mainText={mainText} />
        ))}
      </div>
      <Buttons />
    </div>
  );
}
