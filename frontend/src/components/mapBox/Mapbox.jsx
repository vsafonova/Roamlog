import Map, { Layer, Source, GeolocateControl } from "react-map-gl";
import StyleLoadedGuard from "./StyleLoadedGuard";
import { useState, useRef } from "react";
import CountryModalSheet from "../countryModalSheet/CountryModalSheet";
import AddCountryButton from "./AddCountryButton";
import CountryListModalSheet from "../countryList/CountryListModalSheet";
import * as turf from "@turf/turf";
import { useCountriesState } from "../../hooks/useCountriesState";
import UserPageFooter from "../UserPageFooter";
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Mapbox() {
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const [countryModalSheet, setCountryModalSheet] = useState({
    isOpened: false,
    longitude: 0,
    latitude: 0,
    country: "",
    flagIcon: "",
    visited: false,
    wishListed: false,
  });
  const [countryListModalSheet, setCountryListModalSheet] = useState({
    isOpened: false,
  });

  const source = "country-boundaries";
  const sourceLayer = "country_boundaries";
  const mapRef = useRef();
  const { countries, updateCountryState } = useCountriesState(
    mapRef.current,
    source,
    sourceLayer
  );

  function unselectCountries() {
    mapRef.current
      .querySourceFeatures(source, {
        sourceLayer: sourceLayer,
      })
      .forEach((f) => {
        mapRef.current.setFeatureState(
          {
            source: source,
            sourceLayer: sourceLayer,
            id: f.id,
          },
          { clicked: false }
        );
      });
  }

  const handleAddButtonClick = () => {
    setCountryListModalSheet({ isOpened: true });
  };

  function getCountryCenter(feature) {
    const center = turf.center(feature.geometry);
    const coordinates = center.geometry.coordinates;
    return { lng: coordinates[0], lat: coordinates[1] };
  }

  function selectCountry(feature) {
    const center = getCountryCenter(feature);
    const countryName = feature.properties.name_en || feature.properties.name;
    const countryCode = feature.properties.iso_3166_1;

    setCountryModalSheet({
      id: feature.id,
      longitude: center.lng,
      latitude: center.lat,
      country: countryName,
      flagIcon: countryCode,
      isOpened: true,
      visited: feature.state?.visited,
      wishListed: feature.state?.wishListed,
    });

    mapRef.current.flyTo({
      center: [center.lng, center.lat],
      zoom: 4,
      essential: true,
    });

    unselectCountries();

    mapRef.current.setFeatureState(
      {
        source: source,
        sourceLayer: sourceLayer,
        id: feature.id,
      },
      { clicked: true }
    );
  }

  const handleMapClick = (event) => {
    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: [source],
    });

    if (features.length > 0) {
      const feature = features[0];
      selectCountry(feature);
    }
  };

  const markCountry = (countryId, visited, wishListed) => {
    updateCountryState(countryId, { visited, wishListed });
    setCountryModalSheet((countryModalSheet) => ({
      ...countryModalSheet,
      visited,
      wishListed,
    }));
  };

  const setVisited = (countryId, visited) => {
    markCountry(countryId, visited, false);
  };

  const setWishList = (countryId, wishList) => {
    markCountry(countryId, false, wishList);
  };

  const markAsVisited = (countryId) => {
    setVisited(countryId, true);
  };

  const markAsNotVisited = (countryId) => {
    setVisited(countryId, false);
  };

  const addToWishList = (countryId) => {
    setWishList(countryId, true);
  };

  const removeFromWishList = (countryId) => {
    setWishList(countryId, false);
  };

  const countryLayer = {
    id: "country-boundaries",
    type: "fill",
    source: source,
    "source-layer": sourceLayer,
    paint: {
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "visited"], false],
        "#FF9800",
        ["boolean", ["feature-state", "wishListed"], false],
        "#43A047",
        "rgba(0, 0, 0, 0)",
      ],
      "fill-opacity": 0.5,
    },
  };

  const borderLayer = {
    id: "country-boundaries-border",
    type: "line",
    source: source,
    "source-layer": sourceLayer,
    paint: {
      "line-color": "#000000",
      "line-width": 1,
      "line-opacity": [
        "case",
        ["boolean", ["feature-state", "visited"], false],
        1,
        ["boolean", ["feature-state", "wishListed"], false],
        1,
        ["boolean", ["feature-state", "clicked"], false],
        1,
        0,
      ],
    },
  };

  return (
    <>
      <section>
        <Map
          initialViewState={{
            latitude: 46,
            longitude: 17,
            zoom: 1,
          }}
          style={{ width: "100dvw", height: "91dvh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={["country-boundaries"]}
          onClick={handleMapClick}
          ref={mapRef}
          logoPosition="top-right"
          attributionControl={false}
        >
          <AddCountryButton onClick={handleAddButtonClick} />
          <GeolocateControl
            position="bottom-right"
            style={{ borderRadius: "100%", bottom: "2rem", left: "2rem" }}
          />
          <StyleLoadedGuard
            stylesLoaded={stylesLoaded}
            setStylesLoaded={setStylesLoaded}
          >
            <Source
              id={source}
              type="vector"
              url="mapbox://mapbox.country-boundaries-v1"
            >
              <Layer {...countryLayer} />
              <Layer {...borderLayer} />
            </Source>
          </StyleLoadedGuard>
        </Map>
        <CountryModalSheet
          onVisited={() => markAsVisited(countryModalSheet.id)}
          onAddWishList={() => addToWishList(countryModalSheet.id)}
          removeVisited={() => markAsNotVisited(countryModalSheet.id)}
          removeWishList={() => removeFromWishList(countryModalSheet.id)}
          onClose={() => {
            setCountryModalSheet({ ...countryModalSheet, isOpened: false });
            unselectCountries();
          }}
          isOpen={countryModalSheet.isOpened}
          longitude={countryModalSheet.longitude}
          latitude={countryModalSheet.latitude}
          country={countryModalSheet.country}
          countryCode={countryModalSheet.flagIcon}
          visited={countryModalSheet.visited}
          wishListed={countryModalSheet.wishListed}
        />
        <CountryListModalSheet
          isOpen={countryListModalSheet.isOpened}
          onClose={() => {
            setCountryListModalSheet({
              ...countryListModalSheet,
              isOpened: false,
            });
          }}
          onSelectCountry={(feature) => {
            selectCountry(feature);
            setCountryListModalSheet({
              ...countryListModalSheet,
              isOpened: false,
            });
          }}
          countriesState={countries}
          onAddWishList={addToWishList}
          onVisited={markAsVisited}
          removeVisited={markAsNotVisited}
          removeWishList={removeFromWishList}
        />
      </section>
      <UserPageFooter />
    </>
  );
}
