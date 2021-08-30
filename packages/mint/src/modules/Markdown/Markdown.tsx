import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Markdown({ children }) {
    return <ReactMarkdown children={children} remarkPlugins={[remarkGfm]} />
}
