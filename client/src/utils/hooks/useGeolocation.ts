import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

export interface GeoLocationSensorState {
  loading: boolean
  accuracy: number | null
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number | null
  longitude: number | null
  speed: number | null
  timestamp: number | null
  error?: string
}

export const useGeolocation = (
  options?: PositionOptions & { watch?: boolean }
): GeoLocationSensorState => {
  const mounted = useRef(true)
  const watchId = useRef<number | null>(null)
  const [state, setState] = useState<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  })

  const onEvent = (event: Position) => {
    if (mounted.current) {
      setState({
        loading: false,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      })
    }
  }
  const onEventError = (error: PositionError) => {
    if (mounted.current) {
      setState((oldState) => ({
        ...oldState,
        loading: false,
        error:
          error.code === 1
            ? 'Prohlížeč nemá povolenou geolokaci'
            : error.message,
      }))
    }
  }

  useEffect(() => {
    if (state.error) {
      toast.error(state.error)
    }
  }, [state.error])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onEventError, options)
    if (options?.watch) {
      watchId.current = navigator.geolocation.watchPosition(
        onEvent,
        onEventError,
        options
      )
    }

    return () => {
      mounted.current = false
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current)
      }
    }
  }, [options])

  return state
}
