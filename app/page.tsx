import { CountryCard } from "@/components/layout/CountryCard";
import { Country } from '@/types';

async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3,languages');

    if (!res.ok) {
      throw new Error('Failed to fetch countries');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const countries = await getCountries();
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </main>
  );
}
