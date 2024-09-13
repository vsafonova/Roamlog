import Map, { Layer, Source } from "react-map-gl";
import StyleLoadedGuard from "../mapBox/StyleLoadedGuard";
import { useState } from "react";
import { Link } from "react-router-dom";
import Stats from "../stats/Stats";
import UserPageFooter from "../UserPageFooter";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlrdG9yaWlhLWh5IiwiYSI6ImNsemlpM3JxODBhamEya3F5d2k5dGtwcDUifQ.70l4WJWTi7Sbp8iMaFvxLw";

export default function StatsMap() {
  const [stylesLoaded, setStylesLoaded] = useState(false);
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
            zoom: -0.5,
          }}
          style={{ width: "100dvw", height: "45dvh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          logoPosition="top-right"
          attributionControl={false}
        >
          <Link to="/">
            <img src="/images/LogoWhite.jpg" className="absolute h-10 left-2" />
          </Link>
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
      <Stats />
      <UserPageFooter />
    </>
  );
}
