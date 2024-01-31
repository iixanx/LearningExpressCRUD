const { createClient } = require('redis');

const redisCli = new createClient({ legacyMode: true });

redisCli.on('connect', () => {
    console.log('Redis has initted')
})
redisCli.on('error', err => {
    console.error(err)
})

module.exports = {
    redisCli
}