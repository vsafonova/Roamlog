export default function SliderIndicator({slideTo, ariaLabel}) {
  return (
    <div className="absolute z-[2]" data-twe-carousel-indicators>
      <button
        type="button"
        data-twe-target="#carouselExampleCaptionsFull"
        data-twe-slide-to={slideTo}
        data-twe-carousel-active
        className="rounded-full w-3 h-3 cursor-pointer bg-white opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
        aria-current="true"
        aria-label={ariaLabel}
      ></button>
    </div>
  );
}
