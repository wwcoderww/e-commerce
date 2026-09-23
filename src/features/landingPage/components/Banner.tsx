import userImage from '../assets/user.svg';
import Links from './Links';
export default function banner() {
  return (
    <div className="flex justify-between px-2 py-1 text-2xl">
      <div className="text-4xl">Company Logo</div>
      <div className="flex items-center gap-10 font-medium">
        <Links />
        <div>Search</div>
        <div>
          <img src={userImage} className="w-10" alt="user" />
        </div>
      </div>
    </div>
  );
}
