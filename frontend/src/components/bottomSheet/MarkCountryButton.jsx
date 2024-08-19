import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

export default function MarkCountryButton({ children, onClick }) {
  return (
    <Button
      className="flex items-center gap-2 rounded-full w-1/2 h-14 bg-white text-gray-600"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

MarkCountryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
