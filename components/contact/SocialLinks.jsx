import Image from 'next/image';

export default function SocialLinks() {
  return (
    <div>
      <div className="pl-4 text-4xl font-normal">Follow Us !</div>
      <div className="flex gap-6 py-6 pl-4">
        <div className="relative h-12 w-12 transition duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer">
          <Image src={'/assets/facebook.svg'} alt="Facebook" fill />
        </div>
        <div className="relative h-12 w-12 transition duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer">
          <Image src={'/assets/instagram.svg'} alt="Instagram" fill />
        </div>
        <div className="relative h-12 w-12 transition duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer">
          <Image src={'/assets/x.svg'} fill alt="X" />
        </div>
        <div className="relative h-12 w-12 transition duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer">
          <Image src={'/assets/youtube.svg'} fill alt="Youtube" />
        </div>
      </div>
      <div className="text-xl font-light">2026 Privacy Policy</div>
    </div>
  );
}
