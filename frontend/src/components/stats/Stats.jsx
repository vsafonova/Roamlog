import { FlagIcon, HeartIcon, Squares2X2Icon } from "@heroicons/react/20/solid";

export default function Stats() {
  const continents = [
    "Europe",
    "Africa",
    "Middle East",
    "South America",
    "North America",
    "Central America",
    "Oceania",
    "Central Asia",
    "South Asia",
    "East & South East Asia",
  ];
  return (
    <section>
      <div className="flex items-center gap-4 px-auto py-3 ">
        <div className="flex flex-col items-center">
          <div className="font-bold">12/195</div>
          <div>countries</div>
        </div>
        <span className="w-0.5 h-10 bg-black"></span>
        <div className="flex flex-col items-center">
          <div className="font-bold">6%</div>
          <div>of the world</div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="flex justify-center items-center w-1/2 py-3">
          <FlagIcon className="h-6 w-6" />
          Visited
        </button>
        <button className="flex justify-center items-center w-1/2 py-3">
          <HeartIcon className="h-6 w-6 " />
          Want to visit
        </button>
      </div>
      <div className="flex py-1">
        <button>
          <Squares2X2Icon className="h-6 w-6" />
        </button>
      </div>
      <div className="w-full h-0.5 bg-black my-2"></div>
      <div className="overflow-y-auto h-32">
        {continents.map((continent) => (
          <div key={continent} className="">
            <div className="flex justify-between mb-2">
              <h6 className="bg-black text-white rounded-full px-2 py-1">
                {continent}
              </h6>
              <div>1/10</div>
            </div>
            <ul className=""></ul>
          </div>
        ))}
      </div>
    </section>
  );
}
