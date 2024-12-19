import ListItem from '../components/ListItem'

const producteursEtMarches = [
  {
    id: '1',
    name: 'Ferme des Délices',
    description: 'Producteur de fruits et légumes bio',
    type: 'producteur'
  },
  {
    id: '2',
    name: 'Marché du Centre',
    description: 'Marché hebdomadaire tous les samedis',
    type: 'marche'
  }
]

export default function ProducteursEtMarches () {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Producteurs et Marchés</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {producteursEtMarches.map(item => (
          <ListItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            type={item.type as 'producteur' | 'marche'}
          />
        ))}
      </div>
    </div>
  )
}
