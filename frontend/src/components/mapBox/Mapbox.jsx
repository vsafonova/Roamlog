import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Layer, Source, Popup } from "react-map-gl";
import StyleLoadedGuard from "./StyleLoadedGuard";
import { useEffect, useState, useRef } from "react";
import { Button } from "@material-tailwind/react";
import { FlagIcon, HeartIcon } from "@heroicons/react/20/solid";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlrdG9yaWlhLWh5IiwiYSI6ImNsemlpM3JxODBhamEya3F5d2k5dGtwcDUifQ.70l4WJWTi7Sbp8iMaFvxLw"; // Set your mapbox token here

export default function Mapbox() {
  const [popup, setPopup] = useState(null);
  const mapRef = useRef();
  const [stylesLoaded, setStylesLoaded] = useState(false);

  const handleMapClick = (event) => {
    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ["country-boundaries"],
    });

    if (features.length > 0) {
      const feature = features[0];
      const countryName = feature.properties.name_en || feature.properties.name;

      setPopup({
        id: feature.id,
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        country: countryName,
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
    setPopup(null);
    console.log("Visited");
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
    setPopup(null);
    console.log("Added to wish list");
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
        "#ffA500", // Color when marked as visited
        ["boolean", ["feature-state", "wishList"], false],
        "#00FF00", // Color when added to wish list
        "#edecde", // Default color
      ],
      "fill-opacity": 1,
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
        0.05, // No opacity when not clicked
      ],
    },
  };

  return (
    <Map
      initialViewState={{
        latitude: 46,
        longitude: 17,
        zoom: 1,
      }}
      style={{ width: "100vw", height: "95vh" }}
      mapStyle="mapbox://styles/viktoriia-hy/clzlsy9qn004801r0fku78ub4"
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
      {popup && (
        <Popup
          longitude={popup.longitude}
          latitude={popup.latitude}
          onClose={() => setPopup(null)}
          closeOnClick={false}
        >
          <div>
            <h3 className="font-bold">{popup.country}</h3>
            <div className="flex flex-col gap-2">
              <Button
                className="flex items-center gap-2 rounded-full"
                onClick={() => markAsVisited(popup.id)}
              >
                <FlagIcon className="h-5 w-5" />
                Visited
              </Button>
              <Button
                className="flex items-center gap-2 rounded-full"
                onClick={() => addToWishList(popup.id)}
              >
                <HeartIcon className="h-5 w-5" />
                Want to visit
              </Button>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
