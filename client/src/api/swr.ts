import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'

export type ApiArgs = {
  key?: string
  url: RequestInfo
  init?: RequestInit
} | null

export const useApi = <T>(api: ApiArgs) => {
  const key = useMemo(
    () =>
      api?.key ? api?.key : `${api?.url}${api?.init?.body}${api?.init?.method}`,
    [api]
  )
  const { data, error, revalidate, mutate, isValidating } = useSWR<T>(
    key,
    async () => {
      if (api) {
        const response = await fetch(`/api/${api.url}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          ...(api?.init ?? {}),
        })
        const result = (await response.json()) as Promise<T>
        return result
      }
      return null as any
    }
  )

  useEffect(() => {
    if (error) {
      toast.error(error.message ?? error)
    }
  }, [error])

  return {
    data,
    error,
    revalidate,
    mutate,
    isValidating,
  }
}
