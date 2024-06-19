'use client'

import React, { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import DOMPurify from 'isomorphic-dompurify'

export default function Sanitized({value}) {
    const sanitizedHTML = DOMPurify.sanitize(value);

    // useEffect(() => {
    //     document.querySelectorAll('code').forEach((block) => {
    //       hljs.highlightElement(block);
    //     })
    //   }, [value])

    return <div
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
}