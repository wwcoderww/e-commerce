import Image from 'next/image';
import ALink from '../ALink';

export default function SocialLinks() {
  return (
    <div>
      <div className="pl-4 text-4xl font-normal">Follow Us !</div>
      <div className="flex gap-6 py-6 pl-4">
        <ALink link="https://www.facebook.com/">
          <Image src={'/assets/facebook.svg'} alt="Facebook" fill />
        </ALink>
        <ALink link="https://www.instagram.com/">
          <Image src={'/assets/instagram.svg'} alt="Instagram" fill />
        </ALink>
        <ALink link="https://twitter.com/">
          <Image src={'/assets/x.svg'} fill alt="X" />
        </ALink>
        <ALink link="https://www.youtube.com/">
          <Image src={'/assets/youtube.svg'} fill alt="Youtube" />
        </ALink>
      </div>
      <div className="text-xl font-light">ⓒ2026 Privacy Policy</div>
    </div>
  );
}
