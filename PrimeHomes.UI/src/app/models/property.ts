export interface Property {

  propertyId: number;

  title: string;

  description: string;

  propertyType: string;

  bhk: number;

  price: number;

  area: number;

  location: string;

  city: string;

  imageUrl?: string;

  ownerId: number;

  status: string;

  badge?: string;

  createdDate: string;

  // Multiple property images
  images?: PropertyImage[];
}


export interface PropertyImage {

  propertyImageId: number;

  propertyId: number;

  imageUrl: string;

  createdDate: string;

}