import Cart from './components/Cart';
import Links from './components/Links';
import userImage from './assets/user.svg';
import { Link } from 'react-router-dom';
export default function banner() {
  return (
    <div className="flex items-center justify-between px-4 pt-3 text-2xl">
      <Link to={'/'} className="text-5xl">
        Company Name
      </Link>
      <Links />
      <Cart />
      <img src={userImage} className="w-12 cursor-pointer" alt="user" />
    </div>
  );
}
