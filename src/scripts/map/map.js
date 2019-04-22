import {
  json
} from 'd3';
import {
  feature as topojsonFeature
} from 'topojson';
import {
  mapTexture,
  mapSvg
} from '~/scripts/map/texture';
export const loadMap = () => json('public/data/world.json').then(data => {
  const countries = topojsonFeature(data, data.objects.countries);
  const worldTexture = mapTexture(countries, '#ff5607');
  const worldSvg = mapSvg(data, countries);
  return {worldTexture, countries, worldSvg};
});

export const countryOverlay = (country, color, canvas) => {
  return mapTexture(country.geometry, color, canvas);
}
