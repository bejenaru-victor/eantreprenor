'use client'

import React, { useEffect } from 'react'
import DOMPurify from 'isomorphic-dompurify'

export default function Sanitized({ value }) {
  const sanitizedHTML = DOMPurify.sanitize(value);

  useEffect(() => {
    // Check if hljs is already loaded
    if (!window.hljs) {
      // Create a script element for highlight.js
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js';
      script.defer = true;
      script.onload = () => {
        // Initialize highlight.js after the script is loaded
        document.querySelectorAll('code').forEach((block) => {
          window.hljs.highlightElement(block);
        });
      };

      // Append the script to the document head
      document.head.appendChild(script);

      // Create a link element for highlight.js CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css';

      // Append the link to the document head
      document.head.appendChild(link);
    } else {
      // If hljs is already loaded, highlight the code blocks
      document.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightElement(block);
      });
    }
  }, [value]);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}
