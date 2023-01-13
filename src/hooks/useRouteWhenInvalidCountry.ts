import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import { countryName } from '@apis/countries/entities/country.entity';

export default () => {
  const { query } = useRouter();

  useEffect(() => {
    const country = (query.country as string).replace(/\b[a-z]/, (text) => text.toUpperCase());
    const countries = {
      All: 'All',
      ...countryName,
    };

    const isValidCountry = Object.values(countries).includes(country);

    if (!isValidCountry) {
      Router.replace('/');
    }
  }, []);
};
