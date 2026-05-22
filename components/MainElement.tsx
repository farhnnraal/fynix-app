export default function MainElement({
    content
}: {
    content: React.ReactNode
}) {
    return (
        <div
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center purpose-shadow">
            <span>
                { content }
            </span>
        </div>
    )
}