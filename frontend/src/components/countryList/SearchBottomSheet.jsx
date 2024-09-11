import { Sheet } from "react-modal-sheet";
import "../bottomSheet/customSheet.css";
import CountryList from "./CountryList";
import PropTypes from "prop-types";
import { FlagIcon, HeartIcon } from "@heroicons/react/20/solid";

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
          <div className="flex justify-center gap-10 text-gray-600 text-xs font-semibold bg-gray-100 py-2">
            <div className="flex items-center gap-2">
              <FlagIcon className="h-4 w-4" />
              <div>VISITED</div>
            </div>
            <div className="flex items-center gap-2">
              <HeartIcon className="h-4 w-4" />
              <div>WANT TO VISIT</div>
            </div>
          </div>
          <Sheet.Scroller draggableAt="bottom" style={{ marginTop: "0.5rem" }}>
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
