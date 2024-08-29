import Map, { Layer, Source, GeolocateControl } from "react-map-gl";
import StyleLoadedGuard from "./StyleLoadedGuard";
import { useState, useRef, useEffect } from "react";
import BottomSheet from "../bottomSheet/BotomSheet";
import AddCountryButton from "./AddCountryButton";
import SearchBottomSheet from "../countryList/SearchBottomSheet";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlrdG9yaWlhLWh5IiwiYSI6ImNsemlpM3JxODBhamEya3F5d2k5dGtwcDUifQ.70l4WJWTi7Sbp8iMaFvxLw"; // Set your mapbox token here

export default function Mapbox() {
  const [bottomSheet, setBottomSheet] = useState({
    isOpened: false,
    longitude: 0,
    latitude: 0,
    country: "",
    flagIcon: "",
    visited: false,
    wishListed: false,
  });
  const [searchBottomSheet, setSearchBottomSheet] = useState({
    isOpened: false,
  });

  const mapRef = useRef();
  const [stylesLoaded, setStylesLoaded] = useState(false);

  const [mapHeight, setMapHeight] = useState({
    height: "100vh",
    width: "100vw",
  });
  const updateMapStyle = () => {
    if (window.innerWidth <= 768) {
      setMapHeight({ height: "90vh", width: "100vw" });
    } else {
      setMapHeight({ height: "100vh", width: "100vw" });
    }
  };

  useEffect(() => {
    updateMapStyle();
    window.addEventListener("resize", updateMapStyle);
    return () => window.removeEventListener("resize", updateMapStyle);
  }, []);

  const source = "country-boundaries";
  const sourceLayer = "country_boundaries";

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
    setSearchBottomSheet({ isOpened: true });
  };

  const handleMapClick = (event) => {
    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: [source],
    });

    if (features.length > 0) {
      const feature = features[0];
      const countryName = feature.properties.name_en || feature.properties.name;
      const countryCode = feature.properties.iso_3166_1;

      setBottomSheet({
        id: feature.id,
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        country: countryName,
        flagIcon: countryCode,
        isOpened: true,
        visited: feature.state.visited,
        wishListed: feature.state.wishListed,
      });

      mapRef.current.flyTo({
        center: [event.lngLat.lng, event.lngLat.lat],
        zoom: 2,
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
  };

  const markCountry = (countryId, visited, wishListed) => {
    mapRef.current.setFeatureState(
      {
        source: source,
        sourceLayer: sourceLayer,
        id: countryId,
      },
      { visited: visited, wishList: wishListed }
    );
    setBottomSheet((bottomSheet) => ({ ...bottomSheet, visited, wishListed }));
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
        "#ffA500",
        ["boolean", ["feature-state", "wishList"], false],
        "#00FF00",
        "rgba(0, 0, 0, 0)", // Transparent color when neither state is true
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
        1, // Opacity when visited
        ["boolean", ["feature-state", "wishList"], false],
        1, // Opacity when on wish list
        ["boolean", ["feature-state", "clicked"], false],
        1, // Opacity when clicked
        0, // No opacity when not clicked
      ],
    },
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 46,
          longitude: 17,
          zoom: 1,
        }}
        style={mapHeight}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["country-boundaries"]}
        onClick={handleMapClick}
        ref={mapRef}
        logoPosition="bottom-right"
        attributionControl={false}
      >
        <GeolocateControl position="bottom-left" />
        <AddCountryButton onClick={handleAddButtonClick} />
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
      <BottomSheet
        onVisited={() => markAsVisited(bottomSheet.id)}
        onAddWishList={() => addToWishList(bottomSheet.id)}
        removeVisited={() => markAsNotVisited(bottomSheet.id)}
        removeWishList={() => removeFromWishList(bottomSheet.id)}
        onClose={() => {
          console.log("Close button clicked");
          setBottomSheet({ ...bottomSheet, isOpened: false });
          unselectCountries();
        }}
        isOpen={bottomSheet.isOpened}
        longitude={bottomSheet.longitude}
        latitude={bottomSheet.latitude}
        country={bottomSheet.country}
        countryCode={bottomSheet.flagIcon}
        visited={bottomSheet.visited}
        wishListed={bottomSheet.wishListed}
      />
      <SearchBottomSheet
        isOpen={searchBottomSheet.isOpened}
        onClose={() => {
          setSearchBottomSheet({ ...searchBottomSheet, isOpened: false });
        }}
        source={source}
        mapRef={mapRef.current}
        sourceLayer={sourceLayer}
      />
    </>
  );
}
