import { FlagIcon, HeartIcon } from "@heroicons/react/20/solid";
import { Sheet } from "react-modal-sheet";
import CountryFlag from "../CountryFlag";
import PropTypes from "prop-types";
import MarkCountryButton from "./MarkCountryButton";
import "./customSheet.css";

export default function BottomSheet({
  isOpen,
  onClose,
  longitude,
  latitude,
  countryCode,
  country,
  onVisited,
  onAddWishList,
}) {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      longitude={longitude}
      latitude={latitude}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="flex flex-col gap-4 px-4 pb-10">
            <div className="flex gap-4">
              {countryCode && <CountryFlag countryCode={countryCode} />}
              <h3 className="font-bold">{country}</h3>
            </div>
            <div className="flex flex-row gap-4">
              <MarkCountryButton onClick={onVisited}>
                <FlagIcon className="h-5 w-5" />
                Visited
              </MarkCountryButton>
              <MarkCountryButton onClick={onAddWishList}>
                <HeartIcon className="h-5 w-5" />
                Want to visit
              </MarkCountryButton>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  countryCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  onVisited: PropTypes.func.isRequired,
  onAddWishList: PropTypes.func.isRequired,
};
