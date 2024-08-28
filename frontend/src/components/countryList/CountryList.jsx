import PropTypes from "prop-types";
import { FlagIcon, HeartIcon } from "@heroicons/react/20/solid";
import CountryFlag from "../CountryFlag";
import MarkCountryButton from "../MarkCountryButton";

export default function CountryList({
  onVisited,
  onAddWishList,
  removeVisited,
  removeWishList,
  mapRef,
  source,
  sourceLayer,
}) {
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

  return (
    <div className="px-4">
      <li className="flex justify-between">
        <div className="flex flex-col gap-2">
          {/* {countryCode && <CountryFlag countryCode={countryCode} />} */}
          {sortedFeatures.map((feature) => {
            const countryName = feature.properties.name_en;
            return <h3 key={countryName}>{countryName}</h3>;
          })}
        </div>
        {/* <div className="flex gap-2">
          <MarkCountryButton onClick={visited ? removeVisited : onVisited}>
            <FlagIcon className="h-5 w-5" />
          </MarkCountryButton>
          <MarkCountryButton
            onClick={wishListed ? removeWishList : onAddWishList}
          >
            <HeartIcon className="h-5 w-5" />
          </MarkCountryButton>
        </div> */}
      </li>
    </div>
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
};
