import userImage from '../assets/user.svg';
import Links from './Links';
import Search from './Search';
export default function banner() {
  return (
    <div className="flex justify-between p-2 text-2xl">
      <div className="text-4xl">Company Logo</div>
      <div className="flex items-center gap-10 font-medium">
        <Links />
        <Search />
        <div>
          <img src={userImage} className="w-10" alt="user" />
        </div>
      </div>
    </div>
  );
}
