import Image from 'next/image';
import ALink from '../ALink';

export default function SocialLinks() {
  return (
    <div className="py-12 lg:py-0">
      <div className="text-center text-xl font-normal lg:pl-4 lg:text-start lg:text-4xl">
        Follow Us !
      </div>
      <div className="flex justify-center gap-6 py-6 lg:justify-start lg:pl-4">
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
      <div className="text-center text-lg font-light lg:text-start lg:text-xl">
        ⓒ2026 Privacy Policy
      </div>
    </div>
  );
}
