import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Slide({ gif, text, altText }) {
  return (
    <div className="relative h-full w-full">
      <img
        src={`/images/${gif}`}
        alt={altText}
        className="h-full w-full object-cover overflow-y-hidden"
      />
      <div className="absolute inset-0 grid h-full w-full place-items-center">
        <div className="mx-4 text-left">
          <Typography
            variant="h4"
            color="white"
            className="mt-96 mb-8 text-3xl md:text-4xl lg:text-5xl"
          >
            {text}
          </Typography>
          <div className="flex justify-end gap-2">
            <Button
              className="rounded-full"
              size="lg"
              color="white"
              variant="text"
            >
              Log In
            </Button>
            <Link to="/UserMap">
              <Button className="rounded-full" size="lg" color="white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Slide.propTypes = {
  gif: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};
