import { MapIcon, GlobeEuropeAfricaIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function UserPageFooter() {
  return (
    <footer className="py-2 bg-indigo-500 text-white">
      <nav className="flex justify-center">
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
      </nav>
    </footer>
  );
}
