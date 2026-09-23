import userImage from '../features/landingPage/assets/user.svg';
import Links from '../features/landingPage/components/Links';
import Search from '../features/landingPage/components/Search';
export default function banner() {
  return (
    <div className="flex items-center justify-between p-2 text-2xl">
      <div className="text-5xl">Company Name</div>
      <Links />
      <Search />
      <img src={userImage} className="w-12 cursor-pointer" alt="user" />
    </div>
  );
}
