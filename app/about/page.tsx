import ImageLoader from '@/components/ImageLoader';
import MainDescription from '../../components/about/MainDescription';
import PicDetails from '../../components/about/PicDetails';

export default function About() {
  return (
    <div className="mt-3 flex flex-col pt-6">
      <MainDescription />
      <div className="grid w-screen grid-cols-2 grid-rows-2">
        <PicDetails />
        <ImageLoader
          src={'/assets/aboutPic1.jpg'}
          customClass="rounded-tl-2xl object-cover"
          alt="First Picture"
        />
        <ImageLoader src={'/assets/aboutPic2.jpg'} alt="Second Picture" />
        <PicDetails />
      </div>
    </div>
  );
}
