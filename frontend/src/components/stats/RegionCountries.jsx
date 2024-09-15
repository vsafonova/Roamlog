import CountryFlag from "../CountryFlag";
import PropTypes from "prop-types";

export default function RegionCountries({ region, regionCountries }) {
  return (
    <div className="">
      <div className="flex justify-between mb-2">
        <h6 className="bg-black text-white rounded-full px-2">{region}</h6>
        {/* <div>1/10</div> */}
      </div>
      <ul className="mb-2 flex flex-col gap-2">
        {regionCountries.map((country) => (
          <li key={country.id} className="flex gap-2 items-center">
            <CountryFlag countryCode={country.properties.iso_3166_1} />
            {country.properties.name_en}
          </li>
        ))}
      </ul>
    </div>
  );
}

RegionCountries.propTypes = {
  region: PropTypes.string.isRequired,
  regionCountries: PropTypes.array.isRequired,
};
