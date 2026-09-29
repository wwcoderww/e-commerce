const linkStyle =
  'relative h-12 w-12 transition duration-200 ease-in-out hover:-translate-y-1 hover:cursor-pointer';

type aLinksProps = {
  children: React.ReactNode;
  link: string;
};

export default function ALink({ children, link }: aLinksProps) {
  return (
    <a href={link} target="_blank" className={linkStyle}>
      {children}
    </a>
  );
}
