import houseDoorFill from '@iconify/icons-bi/house-door-fill';
import foodIcon from '@iconify/icons-dashicons/food';
import sharpDesignServices from '@iconify/icons-ic/sharp-design-services';
import agricultureWorker from '@iconify/icons-healthicons/agriculture-worker';
import baselineSettingsBackupRestore from '@iconify/icons-ic/baseline-settings-backup-restore';
import buildingRetail20Regular from '@iconify/icons-fluent/building-retail-20-regular';
import buildingFactory24Regular from '@iconify/icons-fluent/building-factory-24-regular';
import beeIcon from '@iconify/icons-carbon/bee';
import breedingSitesOutline from '@iconify/icons-healthicons/breeding-sites-outline';
import farmIcon from '@iconify/icons-iconoir/farm';
import gardenIcon from '@iconify/icons-maki/garden';
import greenHouse from '@iconify/icons-icon-park-outline/green-house';
import newsvineIcon from '@iconify/icons-ps/newsvine';
import horseIcon from '@iconify/icons-fa-solid/horse';
import spoonSugar from '@iconify/icons-mdi/spoon-sugar';
import vegetableBasket from '@iconify/icons-icon-park-outline/vegetable-basket';
import iNursery from '@iconify/icons-medical-icon/i-nursery';
import fruitBowl from '@iconify/icons-carbon/fruit-bowl';
import residentialCommunity from '@iconify/icons-maki/residential-community';
import robotIndustrialOutline from '@iconify/icons-mdi/robot-industrial-outline';
import forestOutline from '@iconify/icons-healthicons/forest-outline';
import danceBallroom from '@iconify/icons-mdi/dance-ballroom';
import commercialIcon from '@iconify/icons-maki/commercial';
import hotelIcon from '@iconify/icons-carbon/hotel';
import yearIcon from '@iconify/icons-iwwa/year';
import historyIcon from '@iconify/icons-iwwa/history';
import sharpPool from '@iconify/icons-ic/sharp-pool';
import disabledIcon from '@iconify/icons-cil/disabled';
import runningWaterOutline from '@iconify/icons-healthicons/running-water-outline';
import seaAndSun from '@iconify/icons-iconoir/sea-and-sun';

export const TRANSACTION_TYPE = {
  SELL: 'A vendre',
  RENT: 'A Louer'
};

export const AREA_UNIT = {
  PC: 'pc',
  MC: 'mc',
  AC: 'ac',
  ARP: 'arp.',
  HA: 'ha'
};

export const REAL_ESTATE_CATEGORY = {
  RESIDENTIAL: 'Résidentiel',
  COMMERCIAL: 'Commercial'
};

export const RESIDENCE_TYPE = {
  SINGLE_FAMILY_HOME: 'Maison uni-familiale',
  LOFT: 'Loft / Studio',
  INTERGENERATION: 'Intergénération',
  FARMHOUSE: 'Fermette',
  LAND: 'Terrain',
  CONDO: 'Condo',
  PLEX: 'Plex',
  MOBILE_HOME: 'Maison mobile',
  CHALET: 'Chalet'
};

export const COMMERCIAL_TYPE = {
  MULTI_FAMILIAL: 'Multifamilial',
  INDUSTRIAL: 'Industriel',
  ACCOMMODATION: 'Hébergement',
  LAND: 'Terrain',
  OFFICE: 'Bureau',
  COMMERCIAL: 'Commercial',
  AGRICULTURAL: 'Agricole',
  BUSINESS: 'Entreprise'
};


//#region feature
export const NUMBER_OF_ROOM = {
  ONE_ROOM: '1 chambre',
  ONE_ROOM_AND_MORE: '1 chambre et +',
  TWO_ROOM: '2 chambre',
  TWO_ROOM_AND_MORE: '2 chambre et +',
  THREE_ROOM: '3 chambre',
  THREE_ROOM_AND_MORE: '3 chambre et +',
  FOUR_ROOM: '4 chambre',
  FOUR_ROOM_AND_MORE: '4 chambre et +',
  FIVE_ROOM: '5 chambre',
  FIVE_ROOM_AND_MORE: '5 chambre et +'
};

export const NUMBER_OF_BATHROOM = {
  ONE_BATHROOM: '1 salle de bain/ d\'eau et +',
  TWO_BATHROOM: '2 salle de bain/ d\'eau et +',
  THREE_BATHROOM: '3 salle de bain/ d\'eau et +',
  FOUR_BATHROOM: '4 salle de bain/ d\'eau et +',
  FIVE_BATHROOM: '5 salle de bain/ d\'eau et +'
};

export const NUMBER_OF_PARKING = {
  ONE_PARKING: '1 stationnement et +',
  TWO_PARKING: '2 stationnement et +',
  THREE_PARKING: '3 stationnement et +',
  FOUR_PARKING: '4 stationnement et +',
  FIVE_PARKING: '5 stationnement et +'
};

export const NUMBER_OF_HANGAR = {
  ONE_HANGAR: '1 garage et +',
  TWO_HANGAR: '2 garage et +',
  THREE_HANGAR: '3 garage et +',
  FOUR_HANGAR: '4 garage et +',
  FIVE_HANGAR: '5 garage et +'
};

export const OTHER_FEATURES = {
  POOL: 'Piscine',
  ADAPTED_FOR_REDUCED_MOBILITY: 'Adapté pour mobilité réduite',
  ACCESS_TO_WATER: 'Accès à l\'eau',
  ELEVATOR: 'Ascenseur',
  WATERSIDE: 'Bord de l\'eau',
  NAVIGABLE_BODY_OF_WATER: 'Plan d\'eau navigable'
};


//#endregion

//#region building
export const BUILDING_TYPE = {
  SINGLE_STOREY: 'Plain-pied',
  MULTIPLE_LEVEL: 'Paliers multiples',
  TWINNED: 'Jumelé',
  NEW_CONSTRUCTION: 'Nouvelle construction',
  CENTENARY: 'Centenaire/Historique',
  MULTIPLE_STOREY: 'À étages',
  DETACHED: 'Détaché',
  IN_ROW: 'En rangée',
  TEN_YEARS_AND_UNDER: '10 ans et moins'
};
//#endregion

//#region plex
export const PLEX_TYPE = {
  DUPLEX: 'Duplex',
  TRIPLEX: 'Triplex',
  QUADRUPLEX: 'Quadruplex',
  QUINTUPLEX: 'Quintuplex'
};
//#endregion

//#region other criterion
export const OTHER_CRITERION = {
  FREE_VISITS: 'Visites libres',
  FINANCIAL_RECORVERY: 'Reprise de finance'
  // VIRTUAL_FREE_TOURS:'Visites libres virtuelles',
};
//#endregion


export const ACCOMMODATION_TYPE = {
  HOTEL: 'Hôtel',
  HOSTEL: 'Auberge',
  MOTEL: 'Motel',
  SENIOR_RESIDENCE: 'Résidence pour aînés',
  OTHER: 'Autre'
};

export const LAND_TYPE = {
  RESIDENTIAL: 'Zonage résidentiel',
  INDUSTRIAL: 'Zonage industriel',
  FOREST: 'Zonage forestier',
  RECREATIONAL: 'Zonage récréotouristique',
  COMMERCIAL: 'Zonage commercial',
  AGRICULTURAL: 'Zonage agricole',
  RESORT: 'Zonage villégiature',
  OTHER: 'Autre zonage'
};

export const AGRICULTURAL_TYPE = {
  BEEKEEPING: 'Apiculture',
  BREEDING: 'Élevage',
  DAIRY_FARM: 'Ferme laitière',
  HORTICULTURE: 'Horticulture',
  GREEN_HOUSES: 'Serres',
  VINEYARD: 'Vignoble',
  RIDING_STABLE: 'Centre équestre',
  SUGAR_BUSH: 'Érablière',
  MARKET_GARDEN: 'Ferme maraîchère',
  NURSERY: 'Pépinière',
  ORCHARD: 'Verger',
  OTHER: 'Autre'
};

export const BUSINESS_TYPE = {
  FOOD: 'Alimentation',
  ACCOMMODATION: 'Hébergement',
  SERVICE: 'Service',
  AGRICULTURAL: 'Agricole',
  RESTORATION: 'Restauration',
  RETAIL: 'Vente au détail',
  MANUFATURING: 'Fabrication',
  OTHER: 'Autre'

};

export const COMMERCIAL_BUILDING_OTHER = {
  NEW_CONSTRUCTION: 'Nouvelle construction',
  WITH_HISTORY: 'Centenaire/Historique',
  LESS_THAN_10_YEAR: '10 ans et moins'
};

export const PAYMENT_RHYTHM = {
  ONE_SHOT: 'En une fois',
  PER_MONTH: 'mois',
  PER_YEAR: 'ans'
};

export const REAL_ESTATE_STATE = {
  WAITING_FOR_VALIDATION: 'En attente de validation',
  VALIDATED: 'Validé',
  NOT_AVAILABLE: 'Non disponible',
  BESPEAK: 'Reservé',
  REJECTED: 'Rejeté'
};

export const FEATURE_ICON = {
  [COMMERCIAL_BUILDING_OTHER.NEW_CONSTRUCTION]: houseDoorFill,
  [COMMERCIAL_BUILDING_OTHER.WITH_HISTORY]: houseDoorFill,
  [COMMERCIAL_BUILDING_OTHER.LESS_THAN_10_YEAR]: houseDoorFill,

  //
  [BUSINESS_TYPE.FOOD]:foodIcon,
  [BUSINESS_TYPE.ACCOMMODATION]:houseDoorFill,
  [BUSINESS_TYPE.SERVICE]:sharpDesignServices,
  [BUSINESS_TYPE.AGRICULTURAL]:agricultureWorker,
  [BUSINESS_TYPE.RESTORATION]:baselineSettingsBackupRestore,
  [BUSINESS_TYPE.RETAIL]:buildingRetail20Regular,
  [BUSINESS_TYPE.MANUFATURING]:buildingFactory24Regular,

  //
  [AGRICULTURAL_TYPE.BEEKEEPING]:beeIcon,
  [AGRICULTURAL_TYPE.BREEDING]:breedingSitesOutline,
  [AGRICULTURAL_TYPE.DAIRY_FARM]:farmIcon,
  [AGRICULTURAL_TYPE.HORTICULTURE]:gardenIcon,
  [AGRICULTURAL_TYPE.GREEN_HOUSES]:greenHouse,
  [AGRICULTURAL_TYPE.VINEYARD]:newsvineIcon,
  [AGRICULTURAL_TYPE.RIDING_STABLE]:horseIcon,
  [AGRICULTURAL_TYPE.SUGAR_BUSH]:spoonSugar,
  [AGRICULTURAL_TYPE.MARKET_GARDEN]:vegetableBasket,
  [AGRICULTURAL_TYPE.NURSERY]:iNursery,
  [AGRICULTURAL_TYPE.ORCHARD]:fruitBowl,


  //
  [LAND_TYPE.RESIDENTIAL]:residentialCommunity,
  [LAND_TYPE.INDUSTRIAL]:robotIndustrialOutline,
  [LAND_TYPE.FOREST]:forestOutline,
  [LAND_TYPE.RECREATIONAL]:danceBallroom,
  [LAND_TYPE.COMMERCIAL]:commercialIcon,
  [LAND_TYPE.AGRICULTURAL]:agricultureWorker,

  //
  [ACCOMMODATION_TYPE.HOTEL]: hotelIcon,
  [ACCOMMODATION_TYPE.HOSTEL]: hotelIcon,
  [ACCOMMODATION_TYPE.MOTEL]: hotelIcon,
  [ACCOMMODATION_TYPE.SENIOR_RESIDENCE]: hotelIcon,

  //
  [PLEX_TYPE.DUPLEX]:residentialCommunity,
  [PLEX_TYPE.TRIPLEX]:residentialCommunity,
  [PLEX_TYPE.QUADRUPLEX]:residentialCommunity,
  [PLEX_TYPE.QUINTUPLEX]:residentialCommunity,

  //
  [BUILDING_TYPE.SINGLE_STOREY]:residentialCommunity,
  [BUILDING_TYPE.MULTIPLE_LEVEL]:residentialCommunity,
  [BUILDING_TYPE.TWINNED]:residentialCommunity,
  [BUILDING_TYPE.NEW_CONSTRUCTION]:residentialCommunity,
  [BUILDING_TYPE.CENTENARY]:historyIcon,
  [BUILDING_TYPE.MULTIPLE_STOREY]:residentialCommunity,
  [BUILDING_TYPE.DETACHED]:residentialCommunity,
  [BUILDING_TYPE.IN_ROW]:yearIcon,
  [BUILDING_TYPE.TEN_YEARS_AND_UNDER]:yearIcon,

  //
  [OTHER_FEATURES.POOL]: sharpPool,
  [OTHER_FEATURES.ADAPTED_FOR_REDUCED_MOBILITY]: disabledIcon,
  [OTHER_FEATURES.ACCESS_TO_WATER]: runningWaterOutline,
  // [OTHER_FEATURES.ELEVATOR]: sharpPool,
  [OTHER_FEATURES.WATERSIDE]: seaAndSun,
  [OTHER_FEATURES.NAVIGABLE_BODY_OF_WATER]: seaAndSun,


}; 

export { NOTIFICATION_TYPES, NOTIFICATION_ICONS, NOTIFICATION_DEFAULT_ICON, getNotificationIcon } from './notification';
