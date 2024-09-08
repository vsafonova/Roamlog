import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Slide({ gif, text, altText }) {
  return (
    <div className="relative h-full w-full">
      <img src={`/images/${gif}`} alt={altText} className="w-full" />
      <div className="absolute px-8 left-1/2 inset-0 grid place-items-center">
        <div className="w-2/4 text-left md:w-2/4 mb-8">
          <Typography
            variant="h4"
            color="white"
            className="text-3xl md:text-4xl lg:text-5xl"
          >
            {text}
          </Typography>
          <div className="flex justify-start gap-2 mt-4">
            {/* <Button
              className="rounded-full"
              size="lg"
              color="white"
              variant="text"
            >
              Log In
            </Button> */}
            <Link to="/UserMap">
              <Button
                className="rounded-full normal-case"
                size="lg"
                color="white"
              >
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
