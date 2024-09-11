import { PlusIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

export default function AddCountryButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-0 bg-indigo-500 left-2 mb-2 rounded-full w-10 h-10 flex justify-center items-center"
    >
      <PlusIcon className="h-7 w-7 text-white" />
    </button>
  );
}

AddCountryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
