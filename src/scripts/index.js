import '~/styles/index.scss';
import {
  space,
  GLOBE_STATE_LEFT,
  GLOBE_STATE_CENTER
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
import {
  TimelineLite
} from 'gsap';

const STATE_FOCUS_ON_MAP = 'MAP';
const STATE_FOCUS_ON_GLOBE = 'GLOBE';
const STATE_FOCUS_ON_TABLE = 'TABLE';


function run() {
  loadMap().then(data => {
    let state = STATE_FOCUS_ON_GLOBE;
    const map = new Map(data.topology, data.countries);
    const table = new Table();
    table.build();
    table.addRow();
    map.build();
    map.applySvgStats([[-0.127758, 51.507351], [-74.1140279, 40.6891766], [30.5238, 50.4547]]);
    space.run(data);

    let timelineTable = new TimelineLite({ paused: true });
    let timelineMap = new TimelineLite({ paused: true });
    timelineMap.to(...space.getGlobeTween(GLOBE_STATE_LEFT));
    timelineMap.to(...map.expandTween(), '-=1.3');
    timelineMap.to(...table.minimizeTween(), '-=1.3');
    
    let currentTimeline = null;
    let isMoved = false;
    function moveToMap() {
      if (currentTimeline && currentTimeline.isActive()) {
        currentTimeline.pause();
      };
      currentTimeline = timelineMap;
      currentTimeline.restart();
      isMoved = true;
    }
    function moveFromMap() {
      if (currentTimeline && currentTimeline.isActive()) {
        currentTimeline.pause();
      };
      currentTimeline = timelineMap;
      currentTimeline.reverse();
      isMoved = false;
    }
    document.body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      isMoved ? moveFromMap() : moveToMap();
    });
  })
}

run();
