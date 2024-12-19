export type Coordinates = {
  latitude: number
  longitude: number
}

export type Marketplace = Coordinates & {
  nom: string
  commune?: string
  lieu: string
  periode: string
  horaire: string
  categorie: 'Marché'
}

export type ContactInfo = {
  telephone?: string[]
  email?: string
  site?: string
  facebook?: string
}

export type Producteur = Coordinates & {
  nom: string
  produits: string
  lieu: string
  periode: string | string[]
  horaire: string | string[]
  contact: ContactInfo
  type_vente: string[]
  categorie: 'Producteur'
}

// Type principal du fichier JSON
export type DataType = {
  marketplaces: Marketplace[]
  producteurs: Producteur[]
}

export type Location = Marketplace | Producteur
