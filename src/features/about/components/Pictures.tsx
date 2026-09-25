type PicturesProps = {
  picture: string;
};

export default function Pictures({ picture }: PicturesProps) {
  return (
    <div>
      <img
        src={picture}
        alt="First Picture"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
