export type Place = {
  geometry: {
    coordinates: [number, number];
    type?: "Point";
  };
  properties: {
    geocoding: {
      city?: string | null;
      district?: string | null;
      country?: string | null;
      locality?: string | null;
      name: string;
      street?: string | null;
      place_id?: number;
      label?: string;
    };
  };
};

export type Location = {
  id: number;
  lat: number;
  lng: number;
  name: string;
};
