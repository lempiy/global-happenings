const TOTAL = 128769;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class DataService {
    constructor() {
        this.daily_items = [];
        this.counter_items = {};
        this._daily_subs = new Set();
        this._total_change = new Set();
    }

    onDailyChange(fn) {
        this._daily_subs.add(fn);
        return () => this._daily_subs.delete(fn);
    }

    onTotalChange(fn) {
        this._total_change.add(fn);
        return () => this._total_change.delete(fn);
    }

    addItem(item) {
        this.daily_items.push(item);
        const key = `${item.country}:${item.name}`;
        const c = this.counter_items[key];
        this.counter_items[key] = c ? {...c, count: c.count + item.count} : {...item, count: item.count};
        this._daily_subs.forEach(fn => fn({event: 'add', data: item}));
        this._total_change.forEach(fn => fn(this.getTotal()))
    }

    getTotal() {
        return Object.values(this.counter_items);
    }

    emulate() {
        Promise.all([fetch('public/data/cities.json'), fetch('public/data/countries.json')])
            .then(([r1, r2]) => Promise.all([r1.json(), r2.json()]))
            .then(([cities, countries]) => {
                setInterval(() => {
                    const city = cities[getRandomInt(0, TOTAL)];
                    const country = countries[city.country];
                    this.addItem({...city, country_props: country, count: getRandomInt(1, 3)});
                }, 3000)
            })
    }
};

export const dataService = new DataService();
