// clapCount.controller.js
const { readClapCount, writeClapCount } = require('../data/clapCountService');
const dotenv = require('dotenv').config();

const getClapCount = async (req, res) => {
    try {
        const count = readClapCount();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const addClapCount = async (req, res) => {
    try {
        const count = readClapCount();
        const newCount = count + 1;
        writeClapCount(newCount);
        res.status(201).json({ count: newCount });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getClapCount, addClapCount };