const ruuviListener = require('./ruuvi-listener')

function handleRuuviTagEvent(tag, data) {
  console.log(`Event from ${tag.address}`)
  console.log(data)
}

function run() {
  ruuviListener.startListening(handleRuuviTagEvent)
}

run()
