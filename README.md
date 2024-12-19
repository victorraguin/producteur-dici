# Producteur d'ici

Bienvenue sur **Producteur d'ici**, une application web interactive permettant de découvrir les producteurs locaux et marchés près de chez vous grâce à une carte interactive et des fonctionnalités avancées de recherche.

## 🚀 Technologies utilisées

- **Front-end :** React.js, Next.js 15.1.0 (App Router)
- **Style :** Tailwind CSS 3.4.1
- **Carte interactive :** Mapbox GL 3.8.0
- **Gestion de l'état :** TanStack React Query 5.62.7
- **Base de données et authentification :** Supabase
- **Icônes :** React Icons

---

## 📦 Installation

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/producteur-dici.git
   cd producteur-dici
   ```

2. **Installer les dépendances :**

   ```bash
   pnpm install
   ```

3. **Lancer le projet en développement :**

   ```bash
   pnpm dev
   ```

4. **Construire pour la production :**

   ```bash
   pnpm build
   ```

5. **Démarrer l'application en production :**
   ```bash
   pnpm start
   ```

---

## 🧩 Structure du projet

```
producteur-dici/
├── src/
│   ├── app/                          # Structure basée sur l'App Router de Next.js
│   │   ├── actualites/               # Gestion des actualités
│   │   ├── components/               # Composants réutilisables
│   │   ├── connexion/                # Gestion de la connexion
│   │   ├── evenements/               # Gestion des événements
│   │   ├── map/                      # Carte interactive
│   │   ├── producteurs-marches/      # Producteurs et marchés
│   │   ├── types/                    # Types TypeScript
├── public/                           # Ressources statiques
├── package.json                      # Dépendances du projet
├── README.md                         # Documentation du projet
```

---

## ⚙️ Scripts disponibles

- **`pnpm dev` :** Lancer le projet en développement
- **`pnpm build` :** Construire le projet pour la production
- **`pnpm start` :** Démarrer le projet en production
- **`pnpm lint` :** Lancer l'analyse statique ESLint

---

## 🖋️ Contribution

Les contributions sont les bienvenues ! Suivez ces étapes pour proposer des modifications :

1. **Forkez le projet**
2. **Créez une nouvelle branche :** `git checkout -b feature/ma-nouvelle-fonctionnalite`
3. **Apportez vos changements et commitez-les :** `git commit -m 'Ajout de ma nouvelle fonctionnalité'`
4. **Poussez votre branche sur GitHub :** `git push origin feature/ma-nouvelle-fonctionnalite`
5. **Ouvrez une Pull Request**

---

## 🛡️ Licence

Ce projet est sous licence **MIT**. Consultez le fichier `LICENSE` pour plus d'informations.

---

## 📞 Support

Pour toute question ou suggestion, ouvrez une issue sur le dépôt GitHub.

**Merci d'utiliser Producteur d'ici !** 🎉
