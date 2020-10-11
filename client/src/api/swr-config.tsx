import React from 'react'
import { SWRConfig } from 'swr'

type Props = {
  children: React.ReactNode
}

export const SwrConfig = ({ children }: Props) => (
  <SWRConfig
    value={{
      onErrorRetry: (error, key, option, revalidate, { retryCount }) => {
        const retryNumber = retryCount ?? 0
        if (retryNumber >= 2) return
        if (error.status === 404) return

        // retry after 5 seconds
        setTimeout(() => revalidate({ retryCount: retryNumber + 1 }), 5000)
      },
    }}
  >
    {children}
  </SWRConfig>
)
