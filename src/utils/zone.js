import { ZONE_TYPE } from '../constant/zones';

export const formatDisplay = selected => {

  if (selected?.district) {
    return selected?.district?._meta;
  } else if (selected?.city) {
    return selected?.city?._meta;
  } else if (selected?.country) {
    return selected?.country?._meta;
  }

  return '';
};

export const transformZone = (id, zones) => {
  const selected = zones?.find(one => one?.id === id);

  switch (selected?.type) {
    case ZONE_TYPE.DISTRICT: {
      const city = zones?.find(one => one?.id === selected?.parentId);
      const country = zones?.find(one => one?.id === city?.parentId);

      return {
        country,
        city,
        district: selected
      };
    }

    case ZONE_TYPE.CITY: {
      const country = zones?.find(one => one?.id === selected?.parentId);

      return {
        country,
        city: selected
      };
    }

    case ZONE_TYPE.COUNTRY: {

      return {
        country: selected
      };
    }

    default:
      return null;

  }

};
