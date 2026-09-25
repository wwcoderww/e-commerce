import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import MainDescription from './components/MainDescription';
import PicDetails from './components/PicDetails';
import Pictures from './components/Pictures';

export default function About() {
  return (
    <div className="mt-3 flex flex-col pt-6">
      <MainDescription />
      <div className="grid w-screen grid-cols-2 grid-rows-2">
        <PicDetails />
        <Pictures picture={pic1} />
        <Pictures picture={pic2} />
        <PicDetails />
      </div>
    </div>
  );
}
