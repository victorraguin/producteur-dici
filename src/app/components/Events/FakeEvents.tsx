const FakeEvents = () => {
  const events = [
    {
      title: 'Atelier de Cuisine Bio',
      date: 'Samedi 25 Juin 2024',
      location: 'Maison des Producteurs'
    },
    {
      title: 'Dégustation de Produits Locaux',
      date: 'Dimanche 3 Juillet 2024',
      location: 'Marché Central'
    },
    {
      title: 'Festival des Saveurs',
      date: 'Samedi 15 Août 2024',
      location: 'Place de la Ville'
    }
  ]

  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
      <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
        Événements à venir
      </h2>
      <ul className='space-y-4'>
        {events.map((event, index) => (
          <li key={index} className='border-b pb-4'>
            <h3 className='text-lg font-semibold text-gray-800'>
              {event.title}
            </h3>
            <p className='text-sm text-gray-600'>
              {event.date} - {event.location}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FakeEvents
