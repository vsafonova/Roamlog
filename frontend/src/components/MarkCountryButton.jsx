import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function MarkCountryButton({
  children,
  onClick,
  visited,
  wishListed,
  className,
}) {
  const buttonClasses = classNames(
    `flex items-center justify-center gap-2 rounded-full ${className} normal-case font-normal text-base`,
    {
      "bg-orange-500 text-white": visited,
      "bg-green-600 text-white": wishListed,
      "bg-white text-gray-600": !visited && !wishListed,
    }
  );
  return (
    <Button className={buttonClasses} onClick={onClick}>
      {children}
    </Button>
  );
}

MarkCountryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  visited: PropTypes.bool,
  wishListed: PropTypes.bool,
  className: PropTypes.string,
};
