import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Slide({ gif, text, altText }) {
  return (
    <div className="relative h-full w-full overscroll-y-none">
      <img src={`/images/${gif}`} alt={altText} className="object-scale-down" />
      <div className="absolute inset-0">
        <div className="mx-6 h-5/6 flex flex-col justify-end items-start gap-2">
          <Typography
            variant="h1"
            color="white"
            className="text-3xl md:text-4xl lg:text-4xl"
          >
            {text}
          </Typography>
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
    </div>
  );
}

Slide.propTypes = {
  gif: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};
