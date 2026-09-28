import Image from 'next/image';

type PicturesProps = {
  picture: string;
  customClass?: string;
};

export default function Pictures({ picture, customClass }: PicturesProps) {
  return (
    <div className="relative">
      <Image
        src={picture}
        alt="First Picture"
        fill
        className={`object-cover ${customClass}`}
      />
    </div>
  );
}
