import { Sheet } from "react-modal-sheet";
import "../bottomSheet/customSheet.css";
import CountryList from "./CountryList";
import PropTypes from "prop-types";

export default function SearchBottomSheet({
  isOpen,
  onClose,
  source,
  mapRef,
  sourceLayer,
}) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller draggableAt="bottom">
            <CountryList
              source={source}
              mapRef={mapRef}
              sourceLayer={sourceLayer}
            />
          </Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

SearchBottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
  mapRef: PropTypes.object,
  sourceLayer: PropTypes.string.isRequired,
};
