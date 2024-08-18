import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className=" flex justify-between items-center mx-6">
        <Link to="/Map">
          <button>Map</button>
        </Link>
        <Link to="/Passport">
          <button className="ml-2">Passport</button>
        </Link>
      </div>
    </footer>
  );
}
