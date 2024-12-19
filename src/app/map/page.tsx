'use client'
import React, { useEffect, useRef, useState } from 'react'
import Data from './data.json'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { DataType, Location } from '../types/data'

const data = Data as DataType

const extractLocations = (data: DataType) => {
  const marketplaces = data.marketplaces.map(m => ({
    ...m,
    categorie: 'Marché' as const
  }))

  const producteurs = data.producteurs.map(p => ({
    ...p,
    categorie: 'Producteur' as const
  }))

  return [...marketplaces, ...producteurs]
}

const MapPage = () => {
  const locations = extractLocations(data)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  )

  const [showMarketplaces, setShowMarketplaces] = useState(true)
  const [showProducteurs, setShowProducteurs] = useState(true)

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location)
  }

  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  const filteredLocations = locations.filter(loc => {
    if (loc.categorie === 'Marché' && !showMarketplaces) return false
    if (loc.categorie === 'Producteur' && !showProducteurs) return false
    return true
  })

  useEffect(() => {
    if (map.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-1.9, 47.1],
      zoom: 10
    })
  }, [])

  useEffect(() => {
    if (!map.current) return

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    filteredLocations.forEach(loc => {
      const popupContainer = document.createElement('div')
      popupContainer.className = 'popup-container p-2'

      const title = document.createElement('h1')
      title.className = 'popup-title font-semibold text-lg'
      title.textContent = loc.nom

      popupContainer.appendChild(title)

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeOnClick: true
      }).setDOMContent(popupContainer)
      const markerColor = loc.categorie === 'Marché' ? '#3b82f6' : '#10b981'

      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(popup)
        .addTo(map.current!)

      marker.getElement().addEventListener('click', () => {
        handleLocationClick(loc)
      })

      markersRef.current.push(marker)
    })
  }, [filteredLocations])

  return (
    <div className='relative font-sans'>
      <div className='fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/50 shadow-md'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-semibold text-white'>
            Carte des Marchés et Producteurs
          </h1>
          <div className='flex gap-6'>
            <label className='flex items-center gap-2 cursor-pointer select-none text-white font-medium'>
              <input
                className='cursor-pointer accent-blue-500'
                type='checkbox'
                checked={showMarketplaces}
                onChange={() => setShowMarketplaces(!showMarketplaces)}
              />
              <span>Afficher les Marchés</span>
            </label>
            <label className='flex items-center gap-2 cursor-pointer select-none text-white font-medium'>
              <input
                className='cursor-pointer accent-green-500'
                type='checkbox'
                checked={showProducteurs}
                onChange={() => setShowProducteurs(!showProducteurs)}
              />
              <span>Afficher les Producteurs</span>
            </label>
          </div>
        </div>
      </div>

      <div ref={mapContainer} className='w-full h-screen' />

      {selectedLocation && (
        <div className='fixed top-20 left-4 p-4 border rounded shadow bg-black/50 backdrop-blur-md z-50 text-white max-w-xs w-full'>
          <div className='flex justify-between items-center mb-2'>
            <h2 className='text-xl font-bold'>{selectedLocation.nom}</h2>
            <button
              className='text-white hover:text-gray-300'
              onClick={() => setSelectedLocation(null)}
            >
              ✕
            </button>
          </div>
          {'commune' in selectedLocation && (
            <p className='mb-1'>
              <strong>Commune :</strong>{' '}
              {selectedLocation.commune ?? 'Non spécifié'}
            </p>
          )}
          <p className='mb-1'>
            <strong>Lieu :</strong> {selectedLocation.lieu}
          </p>
          <p className='mb-1'>
            <strong>Période :</strong>{' '}
            {Array.isArray(selectedLocation.periode)
              ? selectedLocation.periode.join(', ')
              : selectedLocation.periode}
          </p>
          <p className='mb-1'>
            <strong>Horaire :</strong>{' '}
            {Array.isArray(selectedLocation.horaire)
              ? selectedLocation.horaire.join(', ')
              : selectedLocation.horaire}
          </p>
          {'produits' in selectedLocation && (
            <p className='mb-1'>
              <strong>Produits :</strong> {selectedLocation.produits}
            </p>
          )}
          {'contact' in selectedLocation && (
            <div className='mt-2'>
              <p className='mb-1'>
                <strong>Téléphone :</strong>{' '}
                {Array.isArray(selectedLocation.contact.telephone)
                  ? selectedLocation.contact.telephone.join(', ')
                  : selectedLocation.contact.telephone ?? 'Non spécifié'}
              </p>
              <p className='mb-1'>
                <strong>Email :</strong>{' '}
                {selectedLocation.contact.email ?? 'Non spécifié'}
              </p>
              <p className='mb-1'>
                <strong>Site :</strong>{' '}
                {selectedLocation.contact.site ? (
                  <a
                    href={selectedLocation.contact.site}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-300 underline'
                  >
                    {selectedLocation.contact.site}
                  </a>
                ) : (
                  'Non spécifié'
                )}
              </p>
              <p>
                <strong>Facebook :</strong>{' '}
                {selectedLocation.contact.facebook ?? 'Non spécifié'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default MapPage
