const ruuvi = require('node-ruuvitag');

const startListening = (handler) => {
  ruuvi.on('found', tag => {
    console.log('Discovered RuuviTag: ' + tag.address);
    tag.on('updated', data => {
      handler(tag, data)
    })
  });

  ruuvi.on('warning', message => {
    console.error(new Error(message));
  });
}

exports.startListening = startListening
