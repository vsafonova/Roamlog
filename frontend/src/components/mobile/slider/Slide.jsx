export default function Slide({video, mainText}) {
    return(
        <div
          className="relative float-left -mr-[100%] hidden w-full !transform-none bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          data-twe-carousel-fade
          data-twe-carousel-item
          data-twe-carousel-active
        >
          <video autoPlay muted loop>
            <source src={`/videos/${video}`} type="video/mp4" />
          </video>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
            <div className="flex h-full items-end justify-center">
              <div className="px-14 text-white">
                <h2 className="text-lg font-semibold">
                  {mainText}
                </h2>
                <div className="">
                  <a
                    type="button"
                    className="mb-2 inline-block rounded border-2 border-white px-6 py-2 text-xs font-medium uppercase leading-tight text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 md:mb-0"
                    href="#!"
                    role="button"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Log In
                  </a>
                  <a
                    type="button"
                    className="inline-block rounded border-2 border-white px-6 py-2 text-xs font-medium uppercase leading-tight text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                    href="#!"
                    role="button"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}