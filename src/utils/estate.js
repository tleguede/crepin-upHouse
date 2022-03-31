import { isArray, isString } from 'lodash';
import { FEATURE_ICON } from '../constant';

export const renderFeatures = (selected, onlyThoseWithIcon = false) => {
  let list = [];
  selected?.features?.plexType && list.push(selected?.features?.plexType);
  selected?.features?.featureType && list.push(selected?.features?.featureType);

  if (isArray(selected?.features?.otherFeature)) {
    list = list.concat(selected?.features?.otherFeature);
  }
  if (isArray(selected?.features?.building)) {
    list = list.concat(selected?.features?.building);
  }
  if (isArray(selected?.features?.otherCriterion)) {
    list = list.concat(selected?.features?.otherCriterion);
  }
  if (isArray(selected?.features?.buildingOtherCriterion)) {
    list = list.concat(selected?.features?.buildingOtherCriterion);
  }
  list = list.filter(one => isString(one));

  return list?.map(label => ({
    label,
    icon: FEATURE_ICON[label] || null
  }))?.filter(one => onlyThoseWithIcon ? one?.icon : true);
};