const {createBluetooth} = require('node-ble')
const {bluetooth, destroy} = createBluetooth()

const UUID = 'D2:5D:22:87:2F:B4'

async function run() {
  const adapter = await bluetooth.defaultAdapter()
  let ruuviBeacon = undefined

  if (! await adapter.isDiscovering()) {
    await adapter.startDiscovery()

    while (!ruuviBeacon) {
      console.log('discovering...')

      const devices = await adapter.devices()

      ruuviBeacon = devices.find(uuid => uuid === UUID)

      if (ruuviBeacon) {
        console.log('found RUUVI beacon')
        console.log(ruuviBeacon)
      } else {
        console.log('not found :(')
      }
      console.log(devices)
    }
  }

  console.log('starting discovery process')
  const device = await adapter.waitDevice(ruuviBeacon)
  console.log('found device')
  console.log(device)
  await device.disconnect()
  console.log('connecting...')
  await device.connect()
  console.log('connected')
  const gattServer = await device.gatt()
  console.log('reat gaat server')


  const service2 = await gattServer.getPrimaryService(ruuviBeacon)
  const characteristic2 = await service2.getCharacteristic(ruuviBeacon)
  await characteristic2.startNotifications()
  characteristic2.on('valuechanged', buffer => {
    console.log(buffer)
  })

  //process.exit(0)
}

run()
