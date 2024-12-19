'use client'
import React, { useState } from 'react'
import Data from '../../map/data.json'
import { DataType, Location } from '../../types/data'

const data = Data as DataType

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
  if (!query) return []

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

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Location[]>([])
  const locations = extractLocations(data)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    setQuery(newQuery)
    const foundLocations = searchLocations(newQuery, locations)
    setResults(foundLocations)
  }

  return (
    <div className='mt-6 mx-auto max-w-4xl px-4 py-6'>
      <div className='flex justify-center'>
        <input
          type='text'
          className='w-full md:w-3/4 lg:w-1/2 p-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-lg'
          placeholder='Recherchez un marché ou un producteur (ex: viande bio)'
          value={query}
          onChange={handleSearch}
        />
      </div>

      {results.length > 0 ? (
        <div className='mt-8 space-y-4'>
          {results.map(loc => (
            <div
              key={loc.nom}
              className='p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-150'
            >
              <h2 className='text-xl font-semibold text-gray-800'>{loc.nom}</h2>
              <p className='mt-2 text-gray-600'>
                <strong>Lieu :</strong> {loc.lieu}
              </p>
              {'produits' in loc && (
                <p className='mt-1 text-gray-600'>
                  <strong>Produits :</strong> {loc.produits}
                </p>
              )}
              {'commune' in loc && loc.commune && (
                <p className='mt-1 text-gray-600'>
                  <strong>Commune :</strong> {loc.commune}
                </p>
              )}
              {'type_vente' in loc && (
                <p className='mt-1 text-gray-600'>
                  <strong>Type de vente :</strong> {loc.type_vente.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        query && (
          <p className='mt-8 text-center text-gray-500 text-lg'>
            Aucun résultat trouvé pour "{query}"
          </p>
        )
      )}
    </div>
  )
}

export default SearchBar
