const FakeNews = () => {
  const news = [
    {
      image: 'https://via.placeholder.com/150',
      title: 'Nouvelle Production de Fraises Bio',
      description:
        'Découvrez notre nouvelle récolte de fraises bio disponibles dès maintenant.'
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Marché Local Ouvert',
      description:
        'Visitez le marché local tous les samedis matin à partir de 8h.'
    },
    {
      image: 'https://via.placeholder.com/150',
      title: "Promotion Spéciale d'Été",
      description:
        'Bénéficiez de réductions sur les produits de saison cet été.'
    }
  ]

  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
      <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
        Dernières Actualités
      </h2>
      <div className='grid gap-4'>
        {news.map((item, index) => (
          <div key={index} className='flex items-center space-x-4'>
            <img
              src={item.image}
              alt={item.title}
              className='w-16 h-16 rounded-lg'
            />
            <div>
              <h3 className='text-lg font-semibold text-gray-800'>
                {item.title}
              </h3>
              <p className='text-sm text-gray-600'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FakeNews
