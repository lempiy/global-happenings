import {
  json
} from 'd3';
import {
  feature as topojsonFeature
} from 'topojson';
import {
  mapTexture,
  emptyTexture,
  heatmapTexture
} from '~/scripts/map/texture';
export const loadMap = () => json('public/data/world.json').then(data => {
  const countries = topojsonFeature(data, data.objects.countries);
  const worldTexture = mapTexture(countries, '#ff5607');
  return {worldTexture, countries, topology: data};
});

export const worldOverlay = (countries, color, canvas) => {
  return mapTexture(countries, color, canvas);
};

export const countryOverlay = (country, color, canvas) => {
  return mapTexture(country.geometry, color, canvas);
};

export const emptyOverlay = (canvas) => emptyTexture(canvas);

export const heatmapOverlay = (cities, canvas) => heatmapTexture(cities, canvas);
