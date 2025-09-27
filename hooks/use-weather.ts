"use client"

// Custom hook for weather data management
import { useState, useEffect } from "react"
import useSWR from "swr"
import type { WeatherData, WeatherAlert } from "@/lib/types"

interface UseWeatherOptions {
  lat?: number
  lon?: number
  city?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

interface WeatherHookResult {
  weather: WeatherData | null
  alerts: WeatherAlert[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }
  const data = await response.json()
  if (!data.success) {
    throw new Error(data.error || "Weather API error")
  }
  return data.data
}

export function useWeather(options: UseWeatherOptions): WeatherHookResult {
  const { lat, lon, city, autoRefresh = true, refreshInterval = 600000 } = options // 10 minutes default
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])

  // Build the API URL
  let weatherUrl: string | null = null
  let alertsUrl: string | null = null

  if (city) {
    weatherUrl = `/api/weather/current?city=${encodeURIComponent(city)}`
  } else if (lat !== undefined && lon !== undefined) {
    weatherUrl = `/api/weather/current?lat=${lat}&lon=${lon}`
    alertsUrl = `/api/weather/alerts?lat=${lat}&lon=${lon}`
  }

  // Fetch weather data
  const {
    data: weather,
    error: weatherError,
    mutate: refetchWeather,
    isLoading,
  } = useSWR<WeatherData>(weatherUrl, fetcher, {
    refreshInterval: autoRefresh ? refreshInterval : 0,
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 minutes
  })

  // Fetch alerts separately
  const { data: alertsData, mutate: refetchAlerts } = useSWR<WeatherAlert[]>(alertsUrl, fetcher, {
    refreshInterval: autoRefresh ? refreshInterval * 2 : 0, // Less frequent for alerts
    revalidateOnFocus: false,
  })

  useEffect(() => {
    if (alertsData) {
      setAlerts(alertsData)
    }
  }, [alertsData])

  const refetch = () => {
    refetchWeather()
    refetchAlerts()
  }

  return {
    weather: weather || null,
    alerts,
    isLoading,
    error: weatherError?.message || null,
    refetch,
  }
}

// Hook for forecast data
export function useWeatherForecast(lat?: number, lon?: number) {
  let forecastUrl: string | null = null

  if (lat !== undefined && lon !== undefined) {
    forecastUrl = `/api/weather/forecast?lat=${lat}&lon=${lon}`
  }

  const {
    data: forecast,
    error,
    mutate: refetch,
    isLoading,
  } = useSWR<WeatherData>(forecastUrl, fetcher, {
    refreshInterval: 1800000, // 30 minutes
    revalidateOnFocus: false,
    dedupingInterval: 600000, // 10 minutes
  })

  return {
    forecast: forecast || null,
    isLoading,
    error: error?.message || null,
    refetch,
  }
}

// Hook for location-based weather
export function useLocationWeather() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
          setLocationError(null)
        },
        (error) => {
          setLocationError("Failed to get location: " + error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      )
    } else {
      setLocationError("Geolocation is not supported")
    }
  }, [])

  const weatherResult = useWeather({
    lat: location?.lat,
    lon: location?.lon,
  })

  return {
    ...weatherResult,
    location,
    locationError,
  }
}
