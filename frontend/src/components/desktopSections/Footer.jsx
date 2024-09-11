import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <footer>
      <div
        className="bg-cover bg-no-repeat bg-center h-96 flex flex-col justify-center items-center gap-6"
        style={{ backgroundImage: "url('/images/FooterBg.jpg')" }}
      >
        <div className="text-center">
          <h2 className="font-bold text-white text-4xl mb-4">
            Your travel companion app
          </h2>
          <p className="text-xl text-white">Unlock the world with Roamlog</p>
        </div>
        <div>
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
      <nav className="flex justify-between items-center px-6 py-2">
        <div className="flex items-center gap-6">
          <div>
            <img
              src="/images/LogoBlack.jpg"
              alt="Roamlog logo"
              className="h-10"
            />
          </div>
          <SocialMedia />
        </div>
        <div className="">© Viktoriia Safonova, Stockholm, Sweden.</div>
      </nav>
    </footer>
  );
}
