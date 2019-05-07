import '~/styles/index.scss';
import {
  space
}
from '~/scripts/space/space.js';
import {
  Map
} from '~/scripts/desk/map/map.js';
import {
  Table
} from '~/scripts/desk/table/table.js';
import {
  loadMap
} from '~/scripts/map/map.js';




function run() {
  loadMap().then(data => {
    const map = new Map(data.topology, data.countries);
    const table = new Table();
    table.build();
    table.addRow();
    map.build();
    map.applySvgStats([[-0.127758, 51.507351], [-74.1140279, 40.6891766], [30.5238, 50.4547]]);
    space.run(data);
    document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      map.isCollapsed() ? map.expand() : map.collapse();
      table.isCollapsed() ? table.minimize() : table.collapse();
      space.changeGlobeState();
    });
  })
}

run();
