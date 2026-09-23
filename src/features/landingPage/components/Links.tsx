import { Link } from 'react-router-dom';

export default function Links() {
  return (
    <div className="flex cursor-pointer gap-10">
      <Link to={'/'}>Home</Link>
      <Link to={'/'}>Products</Link>
      <Link to={'/'}>About</Link>
      <Link to={'/'}>Contact Us</Link>
    </div>
  );
}
