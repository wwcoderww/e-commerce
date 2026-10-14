import Link from 'next/link';

const linkClasses =
  'transition duration-300 ease-in-out hover:-translate-y-0.5 hover:!opacity-100 group-hover:opacity-70';

export default function Links() {
  return (
    <div className="group flex flex-1 justify-end gap-10 px-6">
      <Link className={linkClasses} href={'/'}>
        Home
      </Link>
      <Link className={linkClasses} href={'/products'}>
        Products
      </Link>
      <Link className={linkClasses} href={'/about'}>
        About
      </Link>
      <Link className={linkClasses} href={'/contact'}>
        Contact Us
      </Link>
    </div>
  );
}
