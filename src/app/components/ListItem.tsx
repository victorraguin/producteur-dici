import Link from 'next/link'

interface ListItemProps {
  name: string
  description: string
  type: 'producteur' | 'marche'
  id: string
}

export default function ListItem({ name, description, type, id }: ListItemProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        href={`/${type}s/${id}`} 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      >
        Voir plus
      </Link>
    </div>
  )
}

