import { useCallback, useEffect, useState } from "react";

function getCountries(mapRef, source, sourceLayer) {
  const features = mapRef.querySourceFeatures(source, {
    sourceLayer: sourceLayer,
    filter: ["all", ["==", "disputed", "false"]], //, ["==", "worldview", "all"]],
  });

  const uniqueFeatures = Array.from(
    new Map(
      features.map((feature) => [feature.properties.name_en, feature])
    ).values()
  );

  return uniqueFeatures;
}

export function useCountriesState(mapRef, source, sourceLayer) {
  const [countries, setCountries] = useState({});

  useEffect(() => {
    if (!mapRef) {
      return;
    }
    mapRef.on("load", () => {
      const defaultCountriesState = {};
      const features = getCountries(mapRef, source, sourceLayer);
      features.forEach((feature) => {
        feature.state = {
          visited: false,
          wishListed: false,
        };
        defaultCountriesState[feature.id] = feature;
        setCountries(defaultCountriesState);
      });
    });
  }, [mapRef, source, sourceLayer]);

  const updateCountryState = useCallback(
    (id, state) => {
      setCountries((prevCountries) => {
        const updatedCountries = { ...prevCountries };
        const updatedCountry = updatedCountries[id];
        updatedCountry.state = state;
        return updatedCountries;
      });
      mapRef.setFeatureState(
        {
          source: source,
          sourceLayer: sourceLayer,
          id: id,
        },
        state
      );
    },
    [mapRef, source, sourceLayer]
  );
  return { countries, updateCountryState };
}
