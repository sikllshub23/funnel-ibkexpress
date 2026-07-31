import { ibkExpress } from '../../config/ibkExpress.js'

// Retourne la clé de ville ('cotonou' | 'calavi') reconnue dans la config,
// ou null si la ville n'est pas couverte par la grille tarifaire.
export function normalizeCity(rawCityName) {
  if (!rawCityName) return null
  const normalized = rawCityName.trim().toLowerCase()

  for (const ville of ibkExpress.villesCouvertes) {
    if (ville.alias.some((alias) => normalized.includes(alias))) {
      return ville.cle
    }
  }
  return null
}

// Extrait un nom de ville depuis les address_components de Google Geocoding.
export function cityFromAddressComponents(components = []) {
  const locality = components.find((c) => c.types.includes('locality'))
  const fallback = components.find((c) => c.types.includes('administrative_area_level_2'))
  const town = components.find((c) => c.types.includes('administrative_area_level_1'))
  return locality?.long_name || fallback?.long_name || town?.long_name || null
}

export function cityLabel(cityKey) {
  if (cityKey === 'cotonou') return 'Cotonou'
  if (cityKey === 'calavi') return 'Calavi'
  return 'Autre zone'
}
