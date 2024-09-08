import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function NavBar() {
  return (
    <nav className="absolute w-full z-10">
      <div className="flex items-center justify-end flex-row-reverse mx-4 gap-2">
        <div className="flex justify-center gap-2">
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
              size="xs"
              color="white"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <img src="/images/RoamlogLogo.jpg" className="h-24" />
      </div>
    </nav>
  );
}
