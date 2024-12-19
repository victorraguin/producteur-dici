import FakeEvents from './components/Events/FakeEvents'
import FakeNews from './components/News/FakeNews'
import MapWithSearch from './map/MapWithSearch'

export default function Home () {
  return (
    <>
      <div
        className='text-center px-4 py-8'
        style={{ backgroundImage: "url('/background/farm.png')" }}
      >
        <h1 className='text-4xl font-bold mb-6 text-secondary font-title flex flex-row justify-center items-center gap-1'>
          Bienvenue sur Producteur d'ici{' '}
          <img src='/logos/plant.png' alt='plante' className='w-8 h-8' />
        </h1>
        <p className='text-xl mb-10 '>
          Découvrez les producteurs et marchés locaux près de chez vous
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          <FakeNews />
          <FakeEvents />
        </div>
      </div>
      <MapWithSearch />
    </>
  )
}
