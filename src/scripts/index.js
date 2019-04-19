import '~/styles/index.scss';
import {
  space
}
from '~/scripts/space/space.js';
import {
  loadMap
} from '~/scripts/map/map';

document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  space.changeGlobeState();
});


function run() {
  loadMap().then(data => {
    space.run(data);
  })
}

run();
