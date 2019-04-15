import {
  json
} from 'd3';
import {
  feature as topojsonFeature
} from 'topojson';
import {
  mapTexture
} from '~/scripts/space/map/texture';
export const loadMapTexture = () => json('public/data/world.json').then(data => {
  const countries = topojsonFeature(data, data.objects.countries);
  const worldTexture = mapTexture(countries, '#ff5607');
  return worldTexture;
});
