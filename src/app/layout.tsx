import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Producteur d’ici',
  description: 'Annuaire des producteurs et marchés locaux'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='fr'>
      <body className='bg-[#334B35]'>
        <header className=' text-white p-4'>
          <nav className='container mx-auto flex justify-between items-center'>
            <Link
              href='/'
              className='text-2xl font-bold text-secondary font-title flex flex-row items-center gap-1'
            >
              Producteur d'ici{' '}
              <img src='/logos/plant.png' alt='plante' className='w-8 h-8' />
            </Link>
            <ul className='flex space-x-4'>
              <li>
                <Link href='/producteurs-marches'>Producteurs & Marchés</Link>
              </li>
              <li>
                <Link href='/actualites'>Actualités</Link>
              </li>
              <li>
                <Link href='/evenements'>Événements</Link>
              </li>
              <li>
                <Link href='/map'>Carte</Link>
              </li>
              <li>
                <Link href='/connexion'>Connexion Producteur</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className='container mx-auto min-h-screen'>{children}</main>
        <footer className=' text-white p-4 mt-8'>
          <div className='container mx-auto text-center'>
            © 2024 Produits d'ici. Tous droits réservés.
          </div>
        </footer>
      </body>
    </html>
  )
}
