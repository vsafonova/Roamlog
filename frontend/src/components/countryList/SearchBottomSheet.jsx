import { Sheet } from "react-modal-sheet";
import "../bottomSheet/customSheet.css";
import CountryList from "./CountryList";
import PropTypes from "prop-types";

export default function SearchBottomSheet({
  isOpen,
  onClose,
  onSelectCountry,
  countriesState,
  onVisited,
  onAddWishList,
  removeVisited,
  removeWishList,
}) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Sheet.Scroller draggableAt="bottom" style={{ marginTop: "2rem" }}>
            <CountryList
              onSelectCountry={onSelectCountry}
              countriesState={countriesState}
              onVisited={onVisited}
              onAddWishList={onAddWishList}
              removeVisited={removeVisited}
              removeWishList={removeWishList}
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
  onSelectCountry: PropTypes.func.isRequired,
  countriesState: PropTypes.object.isRequired,
  onVisited: PropTypes.func.isRequired,
  onAddWishList: PropTypes.func.isRequired,
  removeVisited: PropTypes.func.isRequired,
  removeWishList: PropTypes.func.isRequired,
};
