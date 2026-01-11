'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', value);
    }

    params.set('page', '1');

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm w-full md:w-1/3">
      <label htmlFor="filter" className="sr-only">Filter Countries</label>
      <select
        id="filter"
        className="w-full border p-2 rounded bg-transparent dark:text-white cursor-pointer"
        defaultValue={searchParams.get('filter') || 'all'}
        onChange={handleFilterChange}
      >
        <option value="all">Ver todos</option>

        <optgroup label="Regions">
          <option value="region_africa">África</option>
          <option value="region_americas">America</option>
          <option value="region_asia">Asia</option>
          <option value="region_europe">Europa</option>
          <option value="region_oceania">Oceanía</option>
        </optgroup>

        <optgroup label="Economic Blocs">
          <option value="bloc_eu">Unión Europea (UE)</option>
          <option value="bloc_au">Unión Africana (UA)</option>
          <option value="bloc_usan">Unión de Naciones Suramericanas (UNASUR)</option>
          <option value="bloc_pa">Alianza del Pacífico</option>
        </optgroup>

        <optgroup label="Status">
          <option value="status_independent">Solo Independientes</option>
          <option value="status_non_independent">No Independientes</option>
        </optgroup>

      </select>
    </div>
  );
};