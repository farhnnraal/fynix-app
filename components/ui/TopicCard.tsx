import Image from "next/image";

interface TopicCardProps {
  imageUrl: string;
  name: string;
  total: number;
}

export default function TopicCard({ imageUrl, name, total }: TopicCardProps) {
  return (
    <div className="p-3 bg-white border border-neutral-300 rounded-xl">
      <Image src={imageUrl} alt={name} width={40} height={40} />
      <h4 className="text-h4 mt-3">{name}</h4>
      <p className="text-caption text-neutral-500">{total} Total Topics</p>
    </div>
  );
}
