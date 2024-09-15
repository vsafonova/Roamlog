import { FlagIcon, HeartIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { useCountriesState } from "../../hooks/useCountriesState";
import PropTypes from "prop-types";
import classNames from "classnames";
import CountryFlag from "../CountryFlag";

function Button({ children, onClick, isActive }) {
  const buttonClasses = classNames(
    `flex items-center justify-center gap-2 rounded-xl normal-case font-normal text-base w-1/2 py-4 shadow-xl`,
    {
      "bg-white color-black": isActive,
      "bg-gray-200 text-gray-600": !isActive,
    }
  );
  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default function Stats({
  mapRef,
  source,
  sourceLayer,
  showVisited,
  setShowVisited,
}) {
  const { countries } = useCountriesState(mapRef.current, source, sourceLayer);
  const countryList = Object.values(countries);
  const regions = countryList.map((country) => country.properties.region);
  const uniqueRegions = [...new Set(regions)];

  const visitedCountries = countryList.filter(
    (country) => country.state.visited
  ).length;

  const visitedPercentage = Math.round((visitedCountries / 195) * 100);

  return (
    <section className="px-4">
      <div className="flex items-center gap-4 px-auto py-3 ">
        <div className="flex flex-col items-center">
          <div className="font-bold">{visitedCountries}/195</div>
          <div>countries</div>
        </div>
        <span className="w-0.5 h-10 bg-black"></span>
        <div className="flex flex-col items-center">
          <div className="font-bold">{visitedPercentage}%</div>
          <div>of the world</div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => setShowVisited(true)} isActive={showVisited}>
          <FlagIcon className="h-6 w-6 text-orange-500" />
          Visited
        </Button>
        <Button onClick={() => setShowVisited(false)} isActive={!showVisited}>
          <HeartIcon className="h-6 w-6 text-green-600" />
          Want to visit
        </Button>
      </div>
      {/* <div className="flex py-2">
        <button>
          <Squares2X2Icon className="h-6 w-6" />
        </button>
      </div> */}
      <div className="w-full h-0.5 bg-gray-200 mt-4"></div>
      <div className="overflow-y-auto h-32 my-4">
        {uniqueRegions.map((region) => {
          const regionCountries = countryList.filter((country) => {
            const matchesRegion = country.properties.region === region;
            let matchesState = country.state.visited === true;

            if (!showVisited) {
              matchesState = country.state.wishListed === true;
            }

            return matchesRegion && matchesState;
          });

          if (regionCountries.length === 0) {
            return;
          }
          return (
            <div key={region} className="">
              <div className="flex justify-between mb-2">
                <h6 className="bg-black text-white rounded-full px-2 py-1">
                  {region}
                </h6>
                {/* <div>1/10</div> */}
              </div>
              <ul className="mb-2 flex flex-col gap-2">
                {regionCountries.map((country) => (
                  <li key={country.id} className="flex gap-2 items-center">
                    <CountryFlag countryCode={country.properties.iso_3166_1} />
                    {country.properties.name_en}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

Stats.propTypes = {
  mapRef: PropTypes.object.isRequired,
  source: PropTypes.string.isRequired,
  sourceLayer: PropTypes.string.isRequired,
  setShowVisited: PropTypes.func.isRequired,
  showVisited: PropTypes.bool.isRequired,
};
