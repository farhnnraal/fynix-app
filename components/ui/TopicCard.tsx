import Image from "next/image";
import Link from "next/link";

interface TopicCardProps {
  id: string;
  imageUrl: string;
  name: string;
  total: number;
}



export default function TopicCard({ id, imageUrl, name, total }: TopicCardProps) {
  return (
    <Link href={`/dashboard/topics/${id}`} className="p-[16px] bg-white border border-neutral-300 rounded-xl">
      <Image src={imageUrl} alt={name} width={40} height={40} />
      <h4 className="text-h5 mt-[16px]">{name}</h4>
      <p className="text-body text-neutral-500">{total} Total Topics</p>
    </Link>
  );
}
