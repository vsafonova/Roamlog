import Map, { Layer, Source } from "react-map-gl";
import StyleLoadedGuard from "../mapBox/StyleLoadedGuard";
import { useState, useRef } from "react";
import Stats from "../stats/Stats";
import UserPageFooter from "../UserPageFooter";
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function StatsMap() {
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const mapRef = useRef();
  const source = "country-boundaries";
  const sourceLayer = "country_boundaries";

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
    },
  };

  return (
    <>
      <section>
        <Map
          initialViewState={{
            latitude: 46,
            longitude: 17,
            zoom: 0,
          }}
          style={{ width: "100dvw", height: "46dvh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          logoPosition="top-right"
          attributionControl={false}
          dragRotate={false}
          touchZoomRotate={false}
          scrollZoom={false}
          ref={mapRef}
        >
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
            </Source>
          </StyleLoadedGuard>
        </Map>
      </section>
      <Stats mapRef={mapRef} source={source} sourceLayer={sourceLayer} />
      <UserPageFooter />
    </>
  );
}
