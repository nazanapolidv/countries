import Image from 'next/image';
import { Country } from '@/types';
import Link from 'next/link';

interface Props {
    country: Country;
}

export const CountryCard = ({ country }: Props) => {

    const languagesString = country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';

    return (
        <Link href={`/country/${country.cca3}`}>
            <article className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 transition-transform cursor-pointer h-full">
                <div className="relative h-40 w-full">
                    <Image
                        src={country.flags.svg}
                        alt={country.flags.alt || `Bandera de ${country.name.common}`}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6">
                    <h2 className="font-bold text-lg mb-4 truncate">{country.name.common}</h2>

                    <div className="text-sm space-y-1">
                        <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                        <p><span className="font-semibold">Region:</span> {country.region}</p>
                        <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                        <p><span className="font-semibold">Languages: </span>{languagesString}</p>
                    </div>
                </div>
            </article>
        </Link>
    );
};