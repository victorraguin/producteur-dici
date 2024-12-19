'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import Data from './data.json'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { DataType, Location } from '../types/data'
import { TbCarrot } from 'react-icons/tb'
import { BiStore } from 'react-icons/bi'

const extractLocations = (data: DataType): Location[] => {
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

const searchLocations = (query: string, locations: Location[]) => {
  if (!query) return locations
  const lowerQuery = query.toLowerCase()
  return locations.filter(loc => {
    const searchFields = [
      loc.nom,
      'produits' in loc ? loc.produits : '',
      loc.lieu,
      'commune' in loc ? loc.commune : '',
      'type_vente' in loc && Array.isArray(loc.type_vente)
        ? loc.type_vente.join(' ')
        : ''
    ]
    return searchFields.some(
      field => field && field.toLowerCase().includes(lowerQuery)
    )
  })
}

const MapWithSearch = () => {
  const allLocations = useMemo(() => extractLocations(Data as DataType), [])

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Location[]>(allLocations)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  )
  const [activeFilter, setActiveFilter] = useState<
    'Marché' | 'Producteur' | null
  >(null)

  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({})
  const popupRef = useRef<mapboxgl.Popup | null>(null)

  useEffect(() => {
    if (map.current) return
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-1.9, 47.1],
      zoom: 10
    })

    popupRef.current = new mapboxgl.Popup({
      offset: 25,
      closeButton: true,
      closeOnClick: true
    })
  }, [])

  useEffect(() => {
    if (!map.current) return

    Object.values(markersRef.current).forEach(marker => marker.remove())
    markersRef.current = {}

    results.forEach(loc => {
      const markerColor = loc.categorie === 'Marché' ? '#3b82f6' : '#10b981'
      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat([loc.longitude, loc.latitude])
        .addTo(map.current!)

      marker.getElement().addEventListener('click', () => {
        handleSelectLocation(loc)
      })

      markersRef.current[loc.nom] = marker
    })

    return () => {
      Object.values(markersRef.current).forEach(marker => marker.remove())
      markersRef.current = {}
    }
  }, [results])

  const handleSelectLocation = (loc: Location) => {
    setSelectedLocation(loc)

    map.current?.flyTo({
      center: [loc.longitude, loc.latitude],
      zoom: 10,
      speed: 1.2,
      essential: true
    })

    popupRef.current?.remove()

    popupRef.current
      ?.setLngLat([loc.longitude, loc.latitude])
      .setHTML(`<h3>${loc.nom}</h3>`)
      .addTo(map.current!)
  }

  const toggleFilter = (filter: 'Marché' | 'Producteur') => {
    setActiveFilter(prevFilter => (prevFilter === filter ? null : filter))
  }

  useEffect(() => {
    let filtered = allLocations
    if (query) {
      filtered = searchLocations(query, allLocations)
    }
    if (activeFilter) {
      filtered = filtered.filter(loc => loc.categorie === activeFilter)
    }
    setResults(filtered)

    if (
      selectedLocation &&
      !filtered.find(loc => loc.nom === selectedLocation.nom)
    ) {
      setSelectedLocation(null)
      popupRef.current?.remove()
    }
  }, [query, activeFilter, allLocations, selectedLocation])

  const sortedResults = selectedLocation
    ? [
        selectedLocation,
        ...results.filter(loc => loc.nom !== selectedLocation.nom)
      ]
    : results

  return (
    <div
      className='w-full h-screen bg-no-repeat bg-bottom'
      style={{ backgroundImage: "url('/background/ble.png')" }}
    >
      <div className='w-full h-screen p-4'>
        <div className='relative flex justify-center mb-6'>
          <div className='absolute left-20 flex items-center space-x-4 top-2'>
            <button
              onClick={() => toggleFilter('Marché')}
              className='border-2 border-gray-300 rounded-md p-1 shadow-md hover:border-secondary focus:outline-none'
            >
              <BiStore
                size={28}
                className={`cursor-pointer transition-opacity duration-300 hover:text-secondary ${
                  activeFilter === 'Marché' ? 'opacity-50' : 'opacity-100'
                }`}
                title='Filtrer par Marché'
              />
            </button>
            <button
              onClick={() => toggleFilter('Producteur')}
              className='border-2 border-gray-300 rounded-md p-1 shadow-md hover:border-secondary focus:outline-none'
            >
              <TbCarrot
                size={28}
                className={`cursor-pointer transition-opacity duration-300 hover:text-secondary ${
                  activeFilter === 'Producteur' ? 'opacity-50' : 'opacity-100'
                }`}
                title='Filtrer par Producteur'
              />
            </button>
          </div>
          <input
            type='text'
            className='w-full md:w-2/3 lg:w-1/2 pl-16 p-3 rounded-lg text-black shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-lg'
            placeholder='Recherchez un marché, un producteur, un produit...'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-6rem)]'>
          <div className='overflow-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            {sortedResults.length > 0
              ? sortedResults.map(loc => (
                  <div
                    key={loc.nom}
                    className={`p-4 bg-white relative h-52 rounded-lg text-black shadow border-2 transition-all cursor-pointer ${
                      selectedLocation
                        ? loc.nom === selectedLocation.nom
                          ? 'opacity-100'
                          : 'opacity-20'
                        : 'opacity-100'
                    }`}
                    onClick={() => handleSelectLocation(loc)}
                  >
                    <h2 className='text-xl font-semibold'>{loc.nom}</h2>
                    <p>
                      <strong>Lieu :</strong> {loc.lieu}
                    </p>
                    {'produits' in loc && (
                      <p>
                        <strong>Produits :</strong> {loc.produits}
                      </p>
                    )}
                    {'commune' in loc && (
                      <p>
                        <strong>Commune :</strong> {loc.commune}
                      </p>
                    )}
                  </div>
                ))
              : query && (
                  <p className='text-center text-gray-500'>
                    Aucun résultat trouvé pour "{query}"
                  </p>
                )}
          </div>
          <div ref={mapContainer} className='w-full h-full rounded-2xl' />
        </div>
      </div>
    </div>
  )
}

export default MapWithSearch
