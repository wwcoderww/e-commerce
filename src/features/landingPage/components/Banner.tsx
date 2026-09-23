import userImage from '../assets/user.svg';
import Links from './Links';
import Search from './Search';
export default function banner() {
  return (
    <div className="flex items-center justify-between p-2 text-2xl">
      <div className="text-4xl">Company Logo</div>
      <Links />
      <Search />
      <img src={userImage} className="w-12 cursor-pointer" alt="user" />
    </div>
  );
}
