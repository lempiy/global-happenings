import { Widget, POSITION_BOTTOM_LEFT } from "~/scripts/desk/widget";
import { select } from 'd3';

const WIDGET_SCREEN_FACTOR = 0.34;

export class Table extends Widget {
    constructor(max_items = 6, columns = [{"key": "order_num", "title": "#"}, {"key": "country", "title": "Country"}, {"key": "city", "title": "City"}, , {"key": "datetime", "title": "Datetime"}]) {
        super(select("body").append("table"), {position: POSITION_BOTTOM_LEFT, widthFactor: WIDGET_SCREEN_FACTOR});
        this.rowHeight = 100 / (max_items + 1)
        this.maxItems = max_items;
        this.columns = columns;
        this.body = null;
    }

    getRowHeight() {
        return this.getWidgetHeight() / (this.maxItems + 1)
    }
    
    build() {
        this.node.html('');
        const header = this.node
            .attr('width', this.getWidgetWidth()+'px')
            .attr('style', 'margin: 15px;')
            .append('thead')
            .append('tr')
            .attr('height', this.getRowHeight()+'px');
        this.columns.forEach(c => {
            header.append('th').text(c.title)
        });
        this.body = this.node.append('tbody');
        for (let i = 0; i < this.maxItems; i++) {
            const row = this.body
                .append('tr')
                .attr('height', this.getRowHeight()+'px');
            this.columns.forEach(c => {
                row.append('td')
            });
        }
    }
    addRow(data) {
        const {body, columns} = this;
        const rowHeight = this.getRowHeight();
        body.select('tr:last-of-type')
            .transition()
            .style('transform', `translateY(${rowHeight}px)`)
            .duration(1000)
            .on('end', function() {
                this.remove();
                const row = body.insert('tr', ':first-child').attr('height', rowHeight+'px').style('transform', 'translate(50%)');
                columns.forEach(c => {
                    row.append('td')
                });
                row.transition().duration(1000).style('transform', 'translate(0)');
            });
    }
}
