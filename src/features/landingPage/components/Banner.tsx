// import userImage from '../assets/user.svg';
export default function banner() {
  return (
    <div className="flex justify-evenly text-2xl text-white">
      <div>Company Logo</div>
      <div>Home</div>
      <div>Products</div>
      <div>About</div>
      <div>Contat Us</div>
      <div>Search</div>
      <div>
        {/* <img src={userImage} className="w-10" alt="user" /> */}
        Login
      </div>
    </div>
  );
}
