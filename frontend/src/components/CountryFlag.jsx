import Icons from "country-flag-icons/react/1x1";
import PropTypes from "prop-types";

export default function CountryFlag({ countryCode }) {
  const Icon = Icons[countryCode];
  return <Icon className="h-5 w-10 rounded" />;
}

CountryFlag.propTypes = {
  countryCode: PropTypes.string.isRequired,
};
