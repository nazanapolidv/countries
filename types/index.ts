export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  population: number;
  region: string;
  capital?: string[];
  cca3: string;
  languages?: { [key: string]: string };
  independent?: boolean;
  continents?: string[];
}