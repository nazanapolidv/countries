import Link from 'next/link';

interface Props {
    page: number;
    totalPages: number;
}

export const Pagination = ({ page, totalPages }: Props) => {
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return (
        <div className="flex justify-center items-center gap-4 mt-10">
            <Link
                href={`/?page=${page - 1}`}
                className={`px-4 py-2 rounded bg-white dark:bg-gray-800 shadow transition-colors ${!hasPrev ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                aria-disabled={!hasPrev}
            >
                Anterior
            </Link>

            <span className="font-bold text-gray-700 dark:text-gray-200">
                Página {page} de {totalPages}
            </span>

            <Link
                href={`/?page=${page + 1}`}
                className={`px-4 py-2 rounded bg-white dark:bg-gray-800 shadow transition-colors ${!hasNext ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                aria-disabled={!hasNext}
            >
                Siguiente
            </Link>
        </div>
    );
};