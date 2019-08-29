'use strict';

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    if (details.url.indexOf('mm.js?') !== -1) {
      details.responseHeaders.push({
        name: 'X-SourceMap',
        value: details.url.replace('mm.js?', 'mm.js.map?')
      })
    }
    return { responseHeaders: details.responseHeaders };
  },
  {urls: ['<all_urls>']},
  [ 'blocking', 'responseHeaders']
);
