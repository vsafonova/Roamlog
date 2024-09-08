import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

export default function Slide({ gif, text, altText }) {
  return (
    <div className="relative h-full w-full">
      <img src={`/images/${gif}`} alt={altText} className="w-full" />
      <div className="absolute inset-0 w-1/2 h-5/6 left-1/2 flex flex-col items-center gap-4 justify-center ">
        <div className="w-2/3 text-center">
          <Typography
            variant="h1"
            color="white"
            className="text-3xl md:text-4xl lg:text-4xl"
          >
            {text}
          </Typography>
        </div>
        <div>
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
  );
}

Slide.propTypes = {
  gif: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};
