import React from "react";
import { Link } from "@inertiajs/inertia-react";

interface Props {
    children: React.ReactNode;
    className?: string;
    textAlign?: 'left' | 'right' | 'center';
    sort?: string;
}

export default function TableHeader({ children, className = '', sort, textAlign = 'left' }: Props) {
    const [sortLink, setSortLink] = React.useState<string>('');

    React.useEffect(() => {
        if (typeof window !== 'undefined' && sort) {
            const query = new URLSearchParams(window.location.search);

            let direction: 'asc' | 'desc' = 'asc';

            if (query.get('sort')) {
                // Choose the opposite direction for sorting
                direction = query.get('sort')?.includes('asc') ? 'desc' : 'asc';
            }

            query.set('sort', `${sort} ${direction}`);

            setSortLink(`?${query.toString()}`);
        }
    }, []);

    const textAlignClass = textAlign === 'center' && 'text-center justify-center'
        || textAlign === 'right' && 'text-right justify-end'
        || 'text-left justify-between';

    return (
        <th className={`${className} py-3.5 px-3 text-sm font-semibold text-left`}>
            <div className={`flex items-center gap-3 ${textAlignClass}`}>
                {children}
                {sort && (
                    <Link href={sortLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                    </Link>
                )}
            </div>
        </th>
    )
}
