const TOTAL = 128769;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class DataService {
    constructor() {
        this.daily_items = [];
        this._daily_subs = new Set();
    }

    onDailyChange(fn) {
        this._daily_subs.add(fn);
        return () => this._daily_subs.delete(fn);
    }

    addItem(item) {
        this.daily_items.push(item);
        this._daily_subs.forEach(fn => fn({event: 'add', data: item}))
    }

    emulate() {
        Promise.all([fetch('public/data/cities.json'), fetch('public/data/countries.json')])
            .then(([r1, r2]) => Promise.all([r1.json(), r2.json()]))
            .then(([cities, countries]) => {
                setInterval(() => {
                    const city = cities[getRandomInt(0, TOTAL)];
                    const country = countries[city.country];
                    this.addItem({...city, country});
                }, 3000)
            })
    }
};

export const dataService = new DataService();
