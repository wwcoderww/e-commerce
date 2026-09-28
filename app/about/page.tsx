import MainDescription from '../../components/about/MainDescription';
import PicDetails from '../../components/about/PicDetails';
import Pictures from '../../components/about/Pictures';

export default function About() {
  return (
    <div className="mt-3 flex flex-col pt-6">
      <MainDescription />
      <div className="grid w-screen grid-cols-2 grid-rows-2">
        <PicDetails />
        <Pictures
          picture={'/assets/aboutPic1.jpg'}
          customClass="rounded-tl-2xl"
        />
        <Pictures picture={'/assets/aboutPic2.jpg'} />
        <PicDetails />
      </div>
    </div>
  );
}
