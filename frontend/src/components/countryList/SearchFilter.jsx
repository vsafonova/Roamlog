import { useState } from "react";
import CountryList from "./CountryList";

export default function SearchFilter() {
  const [searchCountry, setSearchCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchCountry(searchTerm);

    const filteredItems = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCountries(filteredItems);
  };

  return (
    <>
      <input
        className="w-full fixed"
        onChange={handleInputChange}
        value={searchCountry}
        type="text"
        placeholder="Search"
      />
      <CountryList countries={filteredCountries} />
    </>
  );
}
