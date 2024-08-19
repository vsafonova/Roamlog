import Map, { Layer, Source, Popup } from "react-map-gl";
import StyleLoadedGuard from "./StyleLoadedGuard";
import { useState, useRef } from "react";
import Button from "./Button";
import { FlagIcon, HeartIcon } from "@heroicons/react/20/solid";
import { Sheet } from "react-modal-sheet";
import iso3166 from "iso-3166-1";
import CountryFlag from "./CountryFlag";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlrdG9yaWlhLWh5IiwiYSI6ImNsemlpM3JxODBhamEya3F5d2k5dGtwcDUifQ.70l4WJWTi7Sbp8iMaFvxLw"; // Set your mapbox token here

export default function Mapbox() {
  const [bottomSheet, setBottomSheet] = useState(null);
  const mapRef = useRef();
  const [stylesLoaded, setStylesLoaded] = useState(false);

  const handleMapClick = (event) => {
    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ["country-boundaries"],
    });

    if (features.length > 0) {
      const feature = features[0];
      const countryName = feature.properties.name_en || feature.properties.name;
      const countryCode = iso3166
        .whereCountry(countryName)
        ?.alpha2.toUpperCase();

      setBottomSheet({
        id: feature.id,
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        country: countryName,
        flagIcon: countryCode,
      });

      mapRef.current.flyTo({
        center: [event.lngLat.lng, event.lngLat.lat],
        zoom: 4,
        essential: true,
      });

      // Reset the clicked state for all features
      mapRef.current
        .querySourceFeatures("country-boundaries", {
          sourceLayer: "country_boundaries",
        })
        .forEach((f) => {
          mapRef.current.setFeatureState(
            {
              source: "country-boundaries",
              sourceLayer: "country_boundaries",
              id: f.id,
            },
            { clicked: false }
          );
        });

      // Set the clicked state for the clicked feature
      mapRef.current.setFeatureState(
        {
          source: "country-boundaries",
          sourceLayer: "country_boundaries",
          id: feature.id,
        },
        { clicked: true }
      );
    }
  };

  const markAsVisited = (countryId) => {
    mapRef.current.setFeatureState(
      {
        source: "country-boundaries",
        sourceLayer: "country_boundaries",
        id: countryId,
      },
      { visited: true, wishList: false }
    );
  };

  const addToWishList = (countryId) => {
    mapRef.current.setFeatureState(
      {
        source: "country-boundaries",
        sourceLayer: "country_boundaries",
        id: countryId,
      },
      { visited: false, wishList: true }
    );
  };

  const countryLayer = {
    id: "country-boundaries",
    type: "fill",
    source: "country-boundaries",
    "source-layer": "country_boundaries",
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
    source: "country-boundaries",
    "source-layer": "country_boundaries",
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
        style={{ width: "100vw", height: "95vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={["country-boundaries"]}
        onClick={handleMapClick}
        ref={mapRef}
      >
        <StyleLoadedGuard
          stylesLoaded={stylesLoaded}
          setStylesLoaded={setStylesLoaded}
        >
          <Source
            id="country-boundaries"
            type="vector"
            url="mapbox://mapbox.country-boundaries-v1"
          >
            <Layer {...countryLayer} />
            <Layer {...borderLayer} />
          </Source>
        </StyleLoadedGuard>
      </Map>
      {bottomSheet && (
        <Sheet
          isOpen={bottomSheet}
          onClose={() => setBottomSheet(null)}
          longitude={bottomSheet.longitude}
          latitude={bottomSheet.latitude}
          detent="content-height"
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <div className="flex flex-col gap-4 px-4 pb-4">
                <div className="flex gap-2">
                  {bottomSheet?.flagIcon && (
                    <CountryFlag countryCode={bottomSheet?.flagIcon} />
                  )}
                  <h3 className="font-bold">{bottomSheet.country}</h3>
                </div>
                <div className="flex flex-row gap-2">
                  <Button onClick={() => markAsVisited(bottomSheet.id)}>
                    <FlagIcon className="h-5 w-5" />
                    Visited
                  </Button>
                  <Button onClick={() => addToWishList(bottomSheet.id)}>
                    <HeartIcon className="h-5 w-5" />
                    Want to visit
                  </Button>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      )}
    </>
  );
}
