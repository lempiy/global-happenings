import {
  json
} from 'd3';
import {
  feature as topojsonFeature
} from 'topojson';
import {
  mapTexture
} from '~/scripts/map/texture';
export const loadMap = () => json('public/data/world.json').then(data => {
  const countries = topojsonFeature(data, data.objects.countries);
  const worldTexture = mapTexture(countries, '#ff5607');
  return {worldTexture, countries};
});

export const countryOverlay = (country, color, canvas) => {
  return mapTexture(country.geometry, color, canvas);
}
