import Icons from 'country-flag-icons/react/1x1';

export default function CountryFlag ({countryCode}) {
    const Icon = Icons[countryCode];
    return (
        <Icon className="h-5 w-10 rounded-xl" />
    )
}