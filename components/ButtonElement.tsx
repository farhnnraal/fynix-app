"use client";

import React from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ButtonElement({
    icon, destination
}: {
    icon: React.ReactNode,
    destination?: string
}) {
    const router = useRouter();

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        router.back();
    };

    return (
        <>
            <style>{`
                .purpose-shadow {
                    box-shadow: 0px 0 24px rgba(0, 0, 0, 0.10);
                }
            `}</style>
            {destination ? (
                <Link href={destination}>
                    <button className="w-[60px] h-[60px] rounded-full flex items-center justify-center purpose-shadow cursor-pointer bg-white">
                        {icon}
                    </button>
                </Link>
            ) : (
                <button onClick={handleBack} className="w-[60px] h-[60px] rounded-full flex items-center justify-center purpose-shadow cursor-pointer bg-white">
                    {icon}
                </button>
            )}
        </>
    );
}