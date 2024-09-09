import PropTypes from "prop-types";
import { FlagIcon, HeartIcon } from "@heroicons/react/20/solid";
import CountryFlag from "../CountryFlag";
import MarkCountryButton from "../MarkCountryButton";

function getCountries(mapRef, source, sourceLayer) {
  const features = mapRef.querySourceFeatures(source, {
    sourceLayer: sourceLayer,
    filter: ["all", ["==", "disputed", "false"], ["==", "worldview", "all"]],
  });

  const uniqueFeatures = Array.from(
    new Map(
      features.map((feature) => [feature.properties.name_en, feature])
    ).values()
  );

  const sortedFeatures = uniqueFeatures.sort((a, b) => {
    const nameA = a.properties.name_en.toUpperCase();
    const nameB = b.properties.name_en.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return sortedFeatures.map((feature) => {
    const state = mapRef.getFeatureState({
      source: source,
      sourceLayer: sourceLayer,
      id: feature.id,
    });
    feature.state = state;
    return feature;
  });
}

export default function CountryList({
  // onVisited,
  // onAddWishList,
  // removeVisited,
  // removeWishList,
  mapRef,
  source,
  sourceLayer,
  onSelectCountry,
}) {
  const countries = getCountries(mapRef, source, sourceLayer);
  return (
    <ul className="px-4">
      {countries.map((feature) => {
        const countryName = feature.properties.name_en;
        const countryCode = feature.properties.iso_3166_1;
        return (
          <li
            key={countryName}
            className="flex justify-between cursor-pointer hover:bg-gray-100 mb-2"
          >
            <div
              onClick={() => onSelectCountry(feature)}
              className="flex items-center gap-4 w-full"
            >
              <CountryFlag countryCode={countryCode} />
              <h3>{countryName}</h3>
            </div>
            <div className="flex gap-2">
              <MarkCountryButton
                className={"w-8 h-8 p-0"}
                visited={feature.state.visited}
              >
                <FlagIcon className="h-4 w-4" />
              </MarkCountryButton>
              <MarkCountryButton
                className={"w-8 h-8 p-0"}
                wishListed={feature.state.wishListed}
              >
                <HeartIcon className="h-4 w-4" />
              </MarkCountryButton>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

CountryList.propTypes = {
  // onVisited: PropTypes.func.isRequired,
  // onAddWishList: PropTypes.func.isRequired,
  // visited: PropTypes.bool,
  // wishListed: PropTypes.bool,
  // removeVisited: PropTypes.func.isRequired,
  // removeWishList: PropTypes.func.isRequired,
  mapRef: PropTypes.object,
  source: PropTypes.string.isRequired,
  sourceLayer: PropTypes.string.isRequired,
  onSelectCountry: PropTypes.func.isRequired,
};
