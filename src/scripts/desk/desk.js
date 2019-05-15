import {
    Map
  } from '~/scripts/desk/map/map.js';
  import {
    Table
  } from '~/scripts/desk/table/table.js';
  import {
    TimelineLite
  } from 'gsap';

export class Desk {
    constructor(topology, countries) {
        this.map = new Map(topology, countries);
        this.table = new Table();
        this.currentTimeline = null;
    }
    build(columns) {
        this.table.build(columns);
        this.map.build();
        // this.table.addRow();
        // map.applySvgStats([[-0.127758, 51.507351], [-74.1140279, 40.6891766], [30.5238, 50.4547]]);
        
    }

    addToTable(item) {
        console.log(item);
        this.table.addRow(item);
    }

    getTweens() {
        return {
            mapExpand: this.map.expandTween(),
            tableMinimize: this.table.minimizeTween(),
        }
    }
}
