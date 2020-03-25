'use strict';
const fs = require('fs');
const path = require('path');

const parseEnvFile = async (envPath = '') => {
    envPath = !envPath ? path.resolve(process.cwd(), './.env') : envPath;
    try {
        const buffer = await fs.promises.readFile(envPath, {encoding: 'utf8'});
        if (buffer) {
            const resultObj = {};
            const arr = buffer.split('\n')
                .filter(el => !!el)
                .map(el => {
                    return el.split('=');
                });
            for (const elem of arr) {
                resultObj[elem[0].trim()] = elem[1].trim();
            }
            console.dir(resultObj, {depth: 3, color: true})
            return resultObj;
        }
    } catch (err) {
        console.error('Error with env read', err);
    }

};

const setEnv = async (pathEnvFile = '') => {
    try {
        const obj = await parseEnvFile(pathEnvFile);
        for (const prop in obj) {
            process.env[prop] = obj[prop];
            console.log(`${prop}:`, process.env[prop])
        }
    } catch (err) {
        console.error(err);
    }

};
parseEnvFile().then(data => setEnv(data)).catch(err => console.log(err));
module.exports = {
    parseEnvFile, setEnv
};