import React from "react";

export default function HeaderElement({
    elements
}: {
    elements: React.ReactNode
}) {
    return (
        <div className="w-full flex flex-row items-center justify-between">
            { elements }
        </div>
    )
}