'use strict'

console.log('Initialization started')

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    if (details.url.indexOf('mm.js?') !== -1) {
      console.log(`Intercepted request for "${details.url}"`)

      const mapUrl = details.url.replace('mm.js?', 'mm.js.map?')

      console.log(`Adding X-SourceMap header "${mapUrl}"`)

      details.responseHeaders.push({
        name: 'X-SourceMap',
        value: mapUrl,
      })

      console.log('Resulted responseHeaders', details.responseHeaders)
    }

    /**
     * Important! Chrome devtools will not show you modified headers.
     * So, dont be confused.
     */
    return { responseHeaders: details.responseHeaders }
  },
  {
    urls: ['<all_urls>']
  },
  ['blocking', 'responseHeaders']
)

console.log('Initialization ended')
