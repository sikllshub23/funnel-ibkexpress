import { useEffect, useRef, useState } from 'react'
import { useGoogleMapsScript } from '../../hooks/useGoogleMapsScript.js'
import { cityFromAddressComponents, normalizeCity } from '../../utils/city.js'

const COTONOU_CENTER = { lat: 6.3703, lng: 2.3912 }

function buildMapsLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`
}

function buildSearchMapsLink(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

// Adresse au clavier et/ou repère sur la carte : les deux méthodes alimentent
// le même champ, la carte ne fait que pré-remplir ce que l'utilisateur peut ajuster.
export default function MapPicker({ instruction, onChange }) {
  const status = useGoogleMapsScript()
  const [address, setAddress] = useState('')
  const [cityKey, setCityKey] = useState('')
  const [pin, setPin] = useState(null)

  function emit(nextAddress, nextCityKey, nextPin) {
    if (!nextAddress) {
      onChange(null)
      return
    }
    onChange({
      address: nextAddress,
      lat: nextPin?.lat ?? null,
      lng: nextPin?.lng ?? null,
      mapsLink: nextPin ? buildMapsLink(nextPin.lat, nextPin.lng) : buildSearchMapsLink(nextAddress),
      cityKey: nextCityKey || null
    })
  }

  function handleAddressChange(value) {
    setAddress(value)
    emit(value, cityKey, pin)
  }

  function handleCityChange(value) {
    setCityKey(value)
    emit(address, value, pin)
  }

  function handlePinResolved(nextPin, geocoded) {
    const nextAddress = geocoded?.address ?? address
    const nextCityKey = geocoded?.cityKey ?? cityKey
    setPin(nextPin)
    setAddress(nextAddress)
    if (geocoded?.cityKey) setCityKey(geocoded.cityKey)
    emit(nextAddress, nextCityKey, nextPin)
  }

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">{instruction}</span>
        <input
          type="text"
          required
          value={address}
          onChange={(event) => handleAddressChange(event.target.value)}
          placeholder="Ex. Carrefour, quartier, point de repère…"
          className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink placeholder:text-ink-soft/70"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Ville</span>
        <select
          value={cityKey}
          onChange={(event) => handleCityChange(event.target.value)}
          className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink"
        >
          <option value="">Sélectionner…</option>
          <option value="cotonou">Cotonou</option>
          <option value="calavi">Calavi</option>
          <option value="autre">Autre zone</option>
        </select>
      </label>

      {status === 'ready' && <MapPinPicker pin={pin} onResolved={handlePinResolved} />}

      {status === 'error' && (
        <p className="text-xs text-danger">
          Carte indisponible pour le moment. Utilisez l'adresse et la ville ci-dessus.
        </p>
      )}
    </div>
  )
}

function MapPinPicker({ pin, onResolved }) {
  const mapNodeRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const geocoderRef = useRef(null)
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    const google = window.google
    geocoderRef.current = new google.maps.Geocoder()

    const map = new google.maps.Map(mapNodeRef.current, {
      center: pin ?? COTONOU_CENTER,
      zoom: pin ? 15 : 13,
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false
    })
    mapRef.current = map

    const marker = new google.maps.Marker({
      map,
      position: pin ?? COTONOU_CENTER,
      draggable: true
    })
    markerRef.current = marker

    function settleAt(latLng) {
      const lat = latLng.lat()
      const lng = latLng.lng()
      map.panTo(latLng)
      marker.setPosition(latLng)
      geocoderRef.current.geocode({ location: latLng }, (results, geoStatus) => {
        if (geoStatus === 'OK' && results?.[0]) {
          const cityName = cityFromAddressComponents(results[0].address_components)
          onResolved({ lat, lng }, { address: results[0].formatted_address, cityKey: normalizeCity(cityName) })
        } else {
          onResolved({ lat, lng }, null)
        }
      })
    }

    marker.addListener('dragend', () => settleAt(marker.getPosition()))
    map.addListener('click', (event) => settleAt(event.latLng))

    return () => {
      marker.setMap(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function useMyLocation() {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        const lat = latLng.lat()
        const lng = latLng.lng()
        mapRef.current.panTo(latLng)
        mapRef.current.setZoom(15)
        markerRef.current.setPosition(latLng)
        geocoderRef.current.geocode({ location: latLng }, (results, geoStatus) => {
          if (geoStatus === 'OK' && results?.[0]) {
            const cityName = cityFromAddressComponents(results[0].address_components)
            onResolved({ lat, lng }, { address: results[0].formatted_address, cityKey: normalizeCity(cityName) })
          } else {
            onResolved({ lat, lng }, null)
          }
          setLocating(false)
        })
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={useMyLocation}
        disabled={locating}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink px-4 text-sm font-semibold text-ink disabled:opacity-50"
      >
        {locating ? 'Localisation…' : 'Utiliser ma position actuelle'}
      </button>

      <div ref={mapNodeRef} className="h-56 w-full rounded-ticket border border-line" />

      <p className="text-xs text-ink-soft">
        Ou déplacez le repère sur la carte : l'adresse ci-dessus se met à jour automatiquement.
      </p>
    </div>
  )
}
