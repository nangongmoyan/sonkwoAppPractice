/**
 * created by lijianpo on 2021/04/29
 */
import { Socket } from 'phoenix'
import config from './check_config'

const phoenix = () => {
  let instance = {
    socket: {
      hk: null,
    },
    region: 'hk',
    channels: {},
  }

  const createWs = (params, region) => {
    if (!params.token) {
      console.log('need token')
      return
    }
    const phoneixUri = region === 'hk' ? config.hkphoenix : config.phoenix
    const socket = new Socket(phoneixUri, {
      params,
      timeout: 1000 * 40,
      rejoinAfterMs: (tries) => 1000 * 40,
    })

    console.log('create new socker, url: ', phoneixUri)
    socket.onOpen(() => console.info('the socket was open'))
    socket.onError((event) => console.log('Cannot connect.'))
    socket.onClose((event) => console.log('Goodbye.'))
    socket.connect()
    instance.socket[region] = socket
  }

  const getInstance = () => instance

  const setRegion = () => (instance.region = region)

  const joinChannel = (name, params, region, failed) => {
    if (instance.socket[region]) {
      console.log(instance.socket)
      console.log('try to join channel', name, params)
      const channel = instance.socket[region].channel(name, params)
      channel
        .join()
        .receive('ok', ({ messages }) => {
          console.log('join channel ', name)
          instance.channels[name] = channel
        })
        .receive('error', ({ reason }) => {
          console.log('join', reason)
          failed && failed(reason)
        })
        .receive('timeout', () => {
          console.log('join timeout')
          failed && failed('timeout')
        })
      return channel
    }
  }

  const leaveChannel = (name) => {
    if (instance.channels[name]) {
      instance.channels[name].leave()
      instance.channels[name] = null
    }
  }

  const disconnect = () => {
    if (instance.socket.cn) {
      instance.socket.cn.disconnect(() => {
        console.log('cn socket disconnect')
      })
    }

    if (instance.socket.hk) {
      instance.socket.hk.disconnect(() => {
        console.log('hk socket disconnect')
      })
    }

    instance = { socket: { cn: null, hk: null }, channels: {} }
  }

  return {
    createWs,
    setRegion,
    disconnect,
    getInstance,
    joinChannel,
    leaveChannel,
  }
}

export default phoenix()
