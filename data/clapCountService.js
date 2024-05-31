// clapCountService.js
const fs = require('fs');
const path = require('path');
const NodeCache = require('node-cache');

const filePath = path.join(__dirname, 'clapCount.json');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const readClapCount = () => {
    let count = cache.get('clapCount');
    if (count === undefined) {
        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const json = JSON.parse(data);
            count = json.count || 0;
            cache.set('clapCount', count);
        } catch (error) {
            count = 0;
        }
    }
    return count;
};

const writeClapCount = (count) => {
    const json = JSON.stringify({ count });
    fs.writeFileSync(filePath, json, 'utf-8');
    cache.set('clapCount', count);
};

module.exports = {
    readClapCount,
    writeClapCount,
};