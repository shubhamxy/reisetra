import React, { useEffect, useState } from 'react'
import { TextContainer } from '../components/shared/Typography'
import { Spin } from 'antd'

const ContactUsPage = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    !(function() {
      function d(a, b) {
        for (var c = 0; c < a.length && !b.call(this, a[c]); c++);
      }
      function h(a) {
        d(
          document.querySelectorAll(
            `iframe.airtable-embed.airtable-dynamic-height`
          ),
          a
        )
      }
      function e(a) {
        var b = a.getBoundingClientRect()
        a.contentWindow.postMessage(
          {
            key: `airtableEmbedViewportChanged`,
            embedRectInViewport: {
              top: b.top,
              right: b.right,
              bottom: b.bottom,
              left: b.left
            },
            embedViewportSize: {
              height: window.innerHeight,
              width: window.innerWidth
            }
          },
          `*`
        )
      }
      function k() {
        d(document.querySelectorAll(`iframe.airtable-embed`), e)
      }
      function f() {
        clearTimeout(g)
        g = setTimeout(k, 200)
      }
      if (!window._didAddAirtableGlobalEmbedListeners) {
        window._didAddAirtableGlobalEmbedListeners = !0
        var g
        window.addEventListener(`resize`, f, !1)
        window.addEventListener(`scroll`, f, !1)
        window.addEventListener(
          `message`,
          function(a) {
            var b = a.data
            b &&
              `airtableEmbedContentDidResize` === b.key &&
              h(function(c) {
                if (a.source === c.contentWindow)
                  return (
                    c._airtableDidDisableScrollbar ||
                      ((c._airtableDidDisableScrollbar = !0),
                      c.contentWindow.postMessage(
                        { key: `airtableDisableScrollbar` },
                        `*`
                      ),
                      e(c)),
                    (c.height = b.height),
                    !0
                  )
              })
          },
          !1
        )
      }
      setLoading(false)
    })()
  }, [])

  return (
    <TextContainer>
      <div
        style={{
          display: `flex`
        }}
      >
        <Spin style={{ flex: 1 }} spinning={loading} size={`large`} />
        <iframe
          className="airtable-embed airtable-dynamic-height"
          src="https://airtable.com/embed/shrSpKl7RY05z5MR0?backgroundColor=red"
          frameBorder="0"
          onmousewheel=""
          style={{
            background: `transparent`,
            flex: 1
          }}
        />
      </div>
    </TextContainer>
  )
}

export default ContactUsPage
