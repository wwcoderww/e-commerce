import ImageLoader from '@/components/imageLoader';
import MainDescription from './_components/about-mainDescription';
import PicDetails from './_components/about-picDetails';

export default function About() {
  return (
    <div className="mt-3 flex flex-col pt-6">
      <MainDescription />
      <div className="w-screen lg:grid lg:grid-cols-2 lg:grid-rows-2">
        <PicDetails />
        <div className="h-100 py-4 md:h-150 lg:h-full lg:border-0 lg:p-0 lg:py-0">
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
