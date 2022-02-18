import { ZONE_TYPE } from 'src/constant/zones';

export const getAddHintText = type => {

    switch (type) {
        case ZONE_TYPE.COUNTRY:
            return 'Ajouter une ville'

        case ZONE_TYPE.CITY:
            return 'Ajouter une Quartier'

        default: return 'Ajouter un Pays'
    }
}

export const getChildType = type => {

    switch (type) {
        case ZONE_TYPE.COUNTRY:
            return ZONE_TYPE.CITY

        case ZONE_TYPE.CITY:
            return ZONE_TYPE.DISTRICT

        default: return ZONE_TYPE.COUNTRY
    }
}




