import { MapIcon, GlobeEuropeAfricaIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function UserPageFooter() {
  return (
    <footer className="bg-indigo-500 text-white p-2">
      <nav className="flex justify-start items-center">
        <div className="mr-72">
          <Link to="/">
            <img src="/images/LogoWhite.jpg" className="h-10" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link to="/Map">
            <button className="flex flex-col items-center mr-24">
              <MapIcon className="h-5 w-5" />
              Map
            </button>
          </Link>
          <Link to="/Stats">
            <button className="flex flex-col items-center">
              <GlobeEuropeAfricaIcon className="h-5 w-5" />
              Stats
            </button>
          </Link>
        </div>
      </nav>
    </footer>
  );
}
