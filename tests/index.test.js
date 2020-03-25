'use strict';
const fs = require('fs');
const {parseEnvFile, setEnv} = require('../index');

const testConfig = './tests/.env';
const makeTestEnvFile =  () => {
    fs.promises.appendFile(testConfig, 'NODE_ENV = development\n' +
        'EMAIL_PASS = password\n' +
        'PORT = 8000\n' +
        'SECRET = secret\n')
        .then(() => console.log('Test .env file was created'))
        .catch(err => console.log(err))
};
beforeAll(() => {
    return makeTestEnvFile();
});
describe('Let\'s test this module', () => {
    it('first test', async () => {
        expect.assertions(1);
        const data = await parseEnvFile();
        expect(data).toBeGreaterThan(0);
    })
});
//
// afterAll(() => {
//     fs.promises.unlink(testConfig).then(() => true).catch((err) => {
//         throw err;
//     });
// });
