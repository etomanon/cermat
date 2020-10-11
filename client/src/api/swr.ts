import useSWR from 'swr'

export type ApiArgs = {
  key: string
  url: RequestInfo
  init?: RequestInit
} | null

export const useApi = <T>(api: ApiArgs) => {
  const { data, error, revalidate, mutate, isValidating } = useSWR<T>(
    api ? api.key : null,
    () => {
      if (api) {
        return fetch(`/api/${api.url}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          ...(api?.init ?? {}),
        }).then((res) => res.json() as Promise<T>)
      }
      return null as any
    }
  )

  return {
    data,
    error,
    revalidate,
    mutate,
    isValidating,
  }
}
