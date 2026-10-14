import ImageLoader from '@/components/ImageLoader';
import MainDescription from '../../components/about/MainDescription';
import PicDetails from '../../components/about/PicDetails';

export default function About() {
  return (
    <div className="mt-3 flex flex-col pt-6">
      <MainDescription />
      <div className="w-screen lg:grid lg:grid-cols-2 lg:grid-rows-2">
        <PicDetails />
        <div className="h-100 border-b-2 border-primary md:h-150 lg:h-full lg:border-0 lg:p-0">
          <ImageLoader
            src={'/assets/aboutPic1.jpg'}
            customClass="lg:rounded-tl-2xl lg:object-cover"
            alt="First Picture"
          />
        </div>
        <div className="h-100 md:h-150 lg:h-full">
          <ImageLoader src={'/assets/aboutPic2.jpg'} alt="Second Picture" />
        </div>
        <PicDetails />
      </div>
    </div>
  );
}
