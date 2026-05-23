export default function SuperButton({
    text
}: {
    text: React.ReactNode
})  {
    return (
        <>
            <style>{`
                .purpose-shadow {
                    box-shadow: 0px 0 24px rgba(0, 0, 0, 0.10);
                }
            `}</style>
            <button 
                type="button" 
                className="
                    w-[60px]
                    h-[60px]
                    bg-neutral-50
                    border
                    border-neutral-200
                    rounded-full
                    flex
                    items-center
                    justify-center
                    purpose-shadow
                ">
                {text}
            </button>
        </>
    )
}