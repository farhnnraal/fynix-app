import React, { Children } from 'react';
import Link from "next/link";

export default function ButtonElement({
    icon, destination
}: {
    icon: React.ReactNode,
    destination: string
}) {
    return (
        <>
            <style>{`
                .purpose-shadow {
                    box-shadow: 0px 0 24px rgba(0, 0, 0, 0.10);
                }
            `}</style>
            <Link href={ destination }>
                <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center purpose-shadow">
                    { icon }
                </button>
            </Link>
        </>
    )
}