import {
  json
} from 'd3';
import {
  feature as topojsonFeature
} from 'topojson';
import {
  mapTexture,
  mapSvg,
  applySvgStats
} from '~/scripts/map/texture';
export const loadMap = () => json('public/data/world.json').then(data => {
  const countries = topojsonFeature(data, data.objects.countries);
  const worldTexture = mapTexture(countries, '#ff5607');
  const worldSvg = mapSvg(data, countries);
  console.log(worldSvg);
  applySvgStats(worldSvg, data, [[-0.127758, 51.507351], [-74.1140279, 40.6891766], [30.5238, 50.4547]]);
  return {worldTexture, countries, worldSvg};
});

export const countryOverlay = (country, color, canvas) => {
  return mapTexture(country.geometry, color, canvas);
}
