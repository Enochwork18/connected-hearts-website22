/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (MSW)
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - This file will be regenerated on `npx msw init <PUBLIC_DIR>`.
 */

const INTEGRITY_CHECKSUM = 'ca37ab820ea36bc7a158f0e1c1ac3c97'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientIds = new Set()

self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !event.data) {
    return
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  switch (event.data.type) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(event.source, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(event.source, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)

      sendToClient(event.source, {
        type: 'MOCKING_ENABLED',
        payload: true,
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }
  }
})

self.addEventListener('fetch', function (event) {
  const { request } = event

  if (request.mode === 'navigate') {
    return
  }

  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return
  }

  if (activeClientIds.size === 0) {
    return
  }

  const requestId = crypto.randomUUID()

  event.respondWith(
    handleRequest(event, requestId).catch((error) => {
      console.error(
        '[MSW] Failed to mock a "%s" request to "%s": %s',
        request.method,
        request.url,
        error
      )
    })
  )
})

async function handleRequest(event, requestId) {
  const client = await event.target.clients.get(event.clientId)

  if (!client) {
    return passthrough(event.request)
  }

  const response = await getResponse(event, client, requestId)

  if (response && !response[IS_MOCKED_RESPONSE]) {
    return response
  }

  return passthrough(event.request)
}

async function getResponse(event, client, requestId) {
  const { request } = event
  const requestClone = request.clone()
  const getOriginalResponse = () => passthrough(request)

  await sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: requestId,
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
        cache: request.cache,
        mode: request.mode,
        credentials: request.credentials,
        destination: request.destination,
        integrity: request.integrity,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        body: await request.text(),
        keepalive: request.keepalive,
      },
    },
    [requestClone.body]
  )

  const responseMessage = await new Promise((resolve) => {
    function listener(event) {
      if (!event.data) {
        return
      }

      if (event.data.type === 'RESPONSE' && event.data.payload.id === requestId) {
        self.removeEventListener('message', listener)
        resolve(event.data)
      }
    }

    self.addEventListener('message', listener)
  })

  if (responseMessage.payload.type === 'MOCK_NOT_FOUND') {
    return getOriginalResponse()
  }

  const { status, statusText, headers, body } = responseMessage.payload

  const response = new Response(body, {
    status,
    statusText,
    headers,
  })

  Object.defineProperty(response, IS_MOCKED_RESPONSE, {
    value: true,
    enumerable: true,
  })

  return response
}

function sendToClient(client, message, transferables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }

    client.postMessage(
      message,
      [channel.port2].concat(transferables.filter(Boolean))
    )
  })
}

async function passthrough(request) {
  return fetch(request)
}
