import Image from 'next/image';

type PicturesProps = {
  picture: string;
};

export default function Pictures({ picture }: PicturesProps) {
  return (
    <div className="relative">
      <Image src={picture} alt="First Picture" fill className="object-cover" />
    </div>
  );
}
