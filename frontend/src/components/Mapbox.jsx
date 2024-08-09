import Map, { Marker } from "react-map-gl";
import { Room } from "@mui/icons-material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import axios from "axios";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlrdG9yaWlhLWh5IiwiYSI6ImNsemlpM3JxODBhamEya3F5d2k5dGtwcDUifQ.70l4WJWTi7Sbp8iMaFvxLw"; // Set your mapbox token here

export default function Mapbox() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/api/pins');
        console.log(res);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <Map
      initialViewState={{
        latitude: 46,
        longitude: 17,
        zoom: 3,
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/viktoriia-hy/clzlsy9qn004801r0fku78ub4"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {pins.map((p) => (
        <Marker longitude={p.long} latitude={p.lat}>
          <Room />
        </Marker>
      ))}
    </Map>
  );
}
