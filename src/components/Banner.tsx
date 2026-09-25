import Cart from '../features/banner/components/Cart';
import Links from '../features/banner/components/Links';
import userImage from '../features/landingPage/assets/user.svg';
export default function banner() {
  return (
    <div className="flex items-center justify-between px-4 pt-3 text-2xl">
      <div className="text-5xl">Company Name</div>
      <Links />
      <Cart />
      <img src={userImage} className="w-12 cursor-pointer" alt="user" />
    </div>
  );
}
