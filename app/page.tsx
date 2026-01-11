import { CountryCard } from "@/components/layout/CountryCard";
import { Pagination } from "@/components/ui/Pagination";
import { FilterBar } from "@/components/layout/FilterBar";
import { Country } from '@/types';

const itemsPerPage = 24;

async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3,languages,independent,subregion,continents');
    if (!res.ok) {
      throw new Error('Failed to fetch countries');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function filterCountries(countries: Country[], filterParam: string | undefined) {
  if (!filterParam) return countries;

  const [type, value] = filterParam.split('_');
  console.log("Filtrando por:", type, value);
  console.log("Total países antes:", countries.length);

  return countries.filter((country) => {
    if (type === 'region') {
      return country.region.toLowerCase() === value.toLowerCase();
    }
    if (type === 'status' && value === 'independent') {
      return country.independent === true;
    } else if (type === 'status' && value === 'non') {
      return country.independent === false;
    }

    return true;
  });
}

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home(props: HomeProps) {
  const countries = await getCountries();
  const searchParams = await props.searchParams;
  const filterParam = searchParams.filter as string | undefined;

  const filteredCountries = filterCountries(countries, filterParam);

  const page = Number(searchParams.page) || 1;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const visibleCountries = filteredCountries.slice(start, end);
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  return (
    <main className="container mx-auto px-4 py-8">
      <FilterBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {visibleCountries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </main>
  );
}
