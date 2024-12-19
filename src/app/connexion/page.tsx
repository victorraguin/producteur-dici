export default function Connexion() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Connexion Producteur</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input type="email" id="email" name="email" required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Mot de passe</label>
          <input type="password" id="password" name="password" required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors">
          Se connecter
        </button>
      </form>
    </div>
  )
}

