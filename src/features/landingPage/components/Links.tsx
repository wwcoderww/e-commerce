import { Link } from 'react-router-dom';

export default function Links() {
  return (
    <div className="flex flex-1 justify-end gap-10 px-2">
      <Link to={'/'}>Home</Link>
      <Link to={'/products'}>Products</Link>
      <Link to={'/'}>About</Link>
      <Link to={'/'}>Contact Us</Link>
    </div>
  );
}
