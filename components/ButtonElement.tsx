import React, { Children } from 'react';
import Link from "next/link";

export default function ButtonElement({
    icon, destination
}: {
    icon: React.ReactNode,
    destination: string
}) {
    return (
        <Link href={ destination }>
            <button className="w-[44px] h-[44px] rounded-full flex items-center justify-center purpose-shadow">
                { icon }
            </button>
        </Link>
    )
}