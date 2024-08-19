import { useEffect } from "react";
import { useMap } from "react-map-gl";

const StyleLoadedGuard = ({ stylesLoaded, setStylesLoaded, children }) => {
  const mapRef = useMap();
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      const onStyleLoad = () => {
        setStylesLoaded(true);
      };
      map.on("style.load", onStyleLoad);
      if (map.isStyleLoaded()) {
        onStyleLoad();
      }
      return () => {
        map.off("style.load", onStyleLoad);
      };
    } else {
      return undefined;
    }
  }, [mapRef]);

  return stylesLoaded && children;
};

export default StyleLoadedGuard;
