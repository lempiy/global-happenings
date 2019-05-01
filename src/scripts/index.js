import '~/styles/index.scss';
import {
  space
}
from '~/scripts/space/space.js';
import {
  Map
} from '~/scripts/desk/map/map.js';
import {
  loadMap
} from '~/scripts/map/map.js';

document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  space.changeGlobeState();
});


function run() {
  loadMap().then(data => {
    const map = new Map(data.topology, data.countries);
    map.build();
    map.applySvgStats([[-0.127758, 51.507351], [-74.1140279, 40.6891766], [30.5238, 50.4547]]);
    space.run(data);
  })
}

run();
