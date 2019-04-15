import '~/styles/index.scss';
import {
  space
}
from '~/scripts/space/space.js';

document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  space.changeGlobeState();
});


function run() {
  space.run();
}

run();
