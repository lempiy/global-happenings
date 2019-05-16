import '~/styles/index.scss';
import {
  space,
  GLOBE_STATE_LEFT,
  GLOBE_STATE_CENTER
}
from '~/scripts/space/space.js';
import {
  Desk
} from '~/scripts/desk/desk.js';
import {
  loadMap
} from '~/scripts/map/map.js';
import {
  dataService
} from '~/scripts/service/data.js';
import {
  TimelineLite
} from 'gsap';

const STATE_FOCUS_ON_MAP = 'MAP';
const STATE_FOCUS_ON_GLOBE = 'GLOBE';
const STATE_FOCUS_ON_TABLE = 'TABLE';

class App {
  constructor(space) {
    this.currentTimeline = null;
    this.space = space;
    this.dataService = dataService;
  }

  run() {
    dataService.emulate();
    loadMap().then(data => {
      const columns = [{"key": "flag", "title": ""}, {"key": "country", "title": "Country"}, {"key": "city", "title": "City"}, , {"key": "datetime", "title": "Datetime"}];
      this.desk = new Desk(data.topology, data.countries);
      this.desk.build(columns);
      this.space.run(data);
      
      this.dataService.onDailyChange(value => {
        space.watchPoint([Number(value.data.lat), Number(value.data.lng)]);
        this.desk.addToTable({"flag": `<img src='https://www.countryflags.io/${value.data.country.toLowerCase()}/flat/32.png'/ alt='${value.data.country}-flag'>`, "country": value.data.country_props.name, "city": value.data.name, "datetime": (new Date).toISOString()})
        this.desk.addToMap(value.data);
      });

      this.timelineTable = new TimelineLite({ paused: true });
      this.setupDescriptionAnimation();

      let isMoved = false;
      document.body.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (isMoved) {
          this.animateFromDescription();
          isMoved = false;
        } else {
          this.animateToDescription();
          isMoved = true;
        }
      });
    })
  }

  setupDescriptionAnimation() {
    this.timelineDescription = new TimelineLite({ paused: true });
    this.timelineDescription.to(...this.space.getGlobeTween(GLOBE_STATE_LEFT));
    const {mapExpand, tableMinimize} = this.desk.getTweens();
    this.timelineDescription.to(...mapExpand, '-=1.3');
    this.timelineDescription.to(...tableMinimize, '-=1.3');
  }

  animateToDescription() {
    if (this.currentTimeline && this.currentTimeline.isActive()) {
        this.currentTimeline.pause();
    };
    this.currentTimeline = this.timelineDescription;
    this.currentTimeline.restart();
  }

  animateFromDescription() {
    if (this.currentTimeline && this.currentTimeline.isActive()) {
        this.currentTimeline.pause();
    };
    this.currentTimeline = this.timelineDescription;
    this.currentTimeline.reverse();
  }
} 

const app = new App(space);

app.run();
