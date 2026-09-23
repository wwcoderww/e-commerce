import userImage from '../assets/user.svg';
export default function banner() {
  return (
    <div className="flex justify-between px-2 py-1 text-2xl">
      <div>Company Logo</div>
      <div className="flex gap-10">
        <div>Home</div>
        <div>Products</div>
        <div>About</div>
        <div>Contat Us</div>
        <div>Search</div>
        <div>
          <img src={userImage} className="w-10" alt="user" />
        </div>
      </div>
    </div>
  );
}
