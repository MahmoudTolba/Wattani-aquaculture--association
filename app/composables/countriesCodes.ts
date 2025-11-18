import { countries } from "~/utils/countries";

export const useCountriesCodes = () => {
  const getFlagEmoji = (countryCode: string) =>
    countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );

  const countriesList = countries.map((country) => ({
    code: country.dial_code,
    label: `(${country.dial_code}) ${country.name}`,
    dial_code: country.dial_code,
    name: country.name,
    length: country.example?.length || 0,
    iso2: country.iso2_cc,
    avatar: {
      src: `https://flagcdn.com/w40/${country.iso2_cc.toLowerCase()}.png`,
      alt: getFlagEmoji(country.iso2_cc),
    },
  }));

  return { countriesList };
};
