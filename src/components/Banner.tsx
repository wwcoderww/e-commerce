import userImage from '../features/landingPage/assets/user.svg';
import Links from '../features/banner/components/Links';
export default function banner() {
  return (
    <div className="flex items-center justify-between px-4 pt-3 text-2xl">
      <div className="text-5xl">Company Name</div>
      <Links />
      <img src={userImage} className="w-12 cursor-pointer" alt="user" />
    </div>
  );
}
