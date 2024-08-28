import { PlusIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

export default function AddCountryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-10 bg-indigo-500 rounded left-2.5 mb-2"
    >
      <PlusIcon className="h-7 w-7 text-white" />
    </button>
  );
}

AddCountryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
