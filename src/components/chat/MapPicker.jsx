import { useEffect, useRef, useState } from 'react'
import { useGoogleMapsScript } from '../../hooks/useGoogleMapsScript.js'
import { cityFromAddressComponents, normalizeCity, cityLabel } from '../../utils/city.js'

const COTONOU_CENTER = { lat: 6.3703, lng: 2.3912 }

function buildMapsLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`
}

function buildSearchMapsLink(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

export default function MapPicker({ instruction, onChange }) {
  const status = useGoogleMapsScript()

  if (status === 'ready') {
    return <LiveMapPicker instruction={instruction} onChange={onChange} />
  }

  return <ManualAddressPicker instruction={instruction} onChange={onChange} degraded={status === 'error'} />
}

function ManualAddressPicker({ instruction, onChange, degraded }) {
  const [address, setAddress] = useState('')
  const [cityKey, setCityKey] = useState('')

  function emit(nextAddress, nextCityKey) {
    if (!nextAddress) {
      onChange(null)
      return
    }
    onChange({
      address: nextAddress,
      lat: null,
      lng: null,
      mapsLink: buildSearchMapsLink(nextAddress),
      cityKey: nextCityKey || null
    })
  }

  return (
    <div className="space-y-3 rounded-ticket border border-dashed border-line bg-surface p-4">
      <p className="text-xs text-ink-soft">
        {degraded
          ? 'Carte Google Maps bientôt disponible. Renseignez l’adresse manuellement pour le moment.'
          : 'Mode manuel (Intégration Google Maps, Bientôt disponible). Renseignez l’adresse manuellement.'}
      </p>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">{instruction}</span>
        <input
          type="text"
          required
          value={address}
          onChange={(event) => {
            setAddress(event.target.value)
            emit(event.target.value, cityKey)
          }}
          placeholder="Ex. Carrefour, quartier, point de repère…"
          className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink placeholder:text-ink-soft/70"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Ville</span>
        <select
          value={cityKey}
          onChange={(event) => {
            setCityKey(event.target.value)
            emit(address, event.target.value)
          }}
          className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink"
        >
          <option value="">Sélectionner…</option>
          <option value="cotonou">Cotonou</option>
          <option value="calavi">Calavi</option>
          <option value="autre">Autre zone</option>
        </select>
      </label>
    </div>
  )
}

function LiveMapPicker({ instruction, onChange }) {
  const mapNodeRef = useRef(null)
  const inputRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const geocoderRef = useRef(null)
  const [result, setResult] = useState(null)
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    const google = window.google
    geocoderRef.current = new google.maps.Geocoder()

    const map = new google.maps.Map(mapNodeRef.current, {
      center: COTONOU_CENTER,
      zoom: 13,
      disableDefaultUI: true,
      zoomControl: true,
      clickableIcons: false
    })
    mapRef.current = map

    const marker = new google.maps.Marker({
      map,
      position: COTONOU_CENTER,
      draggable: true
    })
    markerRef.current = marker

    function settleAt(latLng) {
      map.panTo(latLng)
      marker.setPosition(latLng)
      geocoderRef.current.geocode({ location: latLng }, (results, geoStatus) => {
        const lat = latLng.lat()
        const lng = latLng.lng()
        if (geoStatus === 'OK' && results?.[0]) {
          const cityName = cityFromAddressComponents(results[0].address_components)
          const cityKey = normalizeCity(cityName)
          const payload = {
            address: results[0].formatted_address,
            lat,
            lng,
            mapsLink: buildMapsLink(lat, lng),
            cityKey
          }
          setResult(payload)
          onChange(payload)
        } else {
          const payload = { address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lng, mapsLink: buildMapsLink(lat, lng), cityKey: null }
          setResult(payload)
          onChange(payload)
        }
      })
    }

    marker.addListener('dragend', () => settleAt(marker.getPosition()))
    map.addListener('click', (event) => settleAt(event.latLng))

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'bj' },
      fields: ['geometry', 'formatted_address']
    })
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry?.location) {
        settleAt(place.geometry.location)
      }
    })

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
        mapRef.current.panTo(latLng)
        markerRef.current.setPosition(latLng)
        mapRef.current.setZoom(15)
        geocoderRef.current.geocode({ location: latLng }, (results, geoStatus) => {
          const lat = latLng.lat()
          const lng = latLng.lng()
          const cityName = geoStatus === 'OK' ? cityFromAddressComponents(results[0]?.address_components) : null
          const cityKey = normalizeCity(cityName)
          const payload = {
            address: geoStatus === 'OK' ? results[0].formatted_address : `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
            lat,
            lng,
            mapsLink: buildMapsLink(lat, lng),
            cityKey
          }
          setResult(payload)
          onChange(payload)
          setLocating(false)
        })
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">{instruction}</span>
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher une adresse…"
          className="min-h-[44px] w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink placeholder:text-ink-soft/70"
        />
      </label>

      <button
        type="button"
        onClick={useMyLocation}
        disabled={locating}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink px-4 text-sm font-semibold text-ink disabled:opacity-50"
      >
        {locating ? 'Localisation…' : 'Utiliser ma position actuelle'}
      </button>

      <div ref={mapNodeRef} className="h-56 w-full rounded-ticket border border-line" />

      <p className="text-xs text-ink-soft">Déplacez le repère si l'adresse trouvée n'est pas exacte.</p>

      {result && (
        <div className="rounded-lg bg-surface p-3 text-sm">
          <p className="text-ink">{result.address}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <a href={result.mapsLink} target="_blank" rel="noreferrer" className="font-medium text-ink underline underline-offset-2">
              Voir sur Google Maps
            </a>
            {result.cityKey ? (
              <span className="font-mono text-xs uppercase text-ink-soft">{cityLabel(result.cityKey)}</span>
            ) : (
              <span className="font-mono text-xs uppercase text-danger">Zone non reconnue</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
