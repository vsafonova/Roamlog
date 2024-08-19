import { XMarkIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

export default function CloseButton({ onClick }) {
  return (
    <div
      className="absolute bottom-48 left-4 p-2 bg-white text-black rounded-full"
      onClick={onClick}
    >
      <XMarkIcon className="h-5 w-5" />
    </div>
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
