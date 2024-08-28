import React from 'react'

import { Metadata } from 'next'

export interface CreatePageProps {
  title?: string
  metadata?: Metadata
  renderComponent: React.FC<any>
}

/**
 * Inspired by
 * https://blog.rstankov.com/structuring-next-js-application/
 */
export const createPage = (props: CreatePageProps) => {
  const { renderComponent: RenderComponent, title, metadata } = props

  async function Page(props: any) {
    // This is a server component where you can verify features flags, access, etc.
    return <RenderComponent {...props} />
  }

  return {
    metadata: {
      title,
      ...metadata,
    },
    Page,
  }
}
