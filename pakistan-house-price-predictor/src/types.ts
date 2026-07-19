export interface FormData {
  location: string;
  area: number | '';
  bedrooms: number | '';
  bathrooms: number | '';
  stories: number | '';
  parkingSpaces: number | '';
  propertyType: string;
  purpose: string;
  condition: string;
  yearBuilt: number | '';
  nearbySchools: boolean;
  nearbyHospital: boolean;
  nearbyMarket: boolean;
  nearbyMosque: boolean;
  nearbyPark: boolean;
}

export interface PredictionResponse {
  price: string;
  confidence: number;
  rangeLow: string;
  rangeHigh: string;
}
