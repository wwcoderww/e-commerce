'use client';
import ImageLoader from '@/components/imageLoader';

export default function LandingPage() {
  return (
    <>
      <div className="flex h-full flex-1 flex-col pt-10 md:flex-row">
        <div className="flex h-full flex-col gap-12 p-4 md:w-6/10 md:flex-1 md:p-0 md:pl-25">
          <div className="border-primay border-b-2 border-solid pb-4 text-5xl md:mt-[22vh] md:border-0 md:p-0 md:text-8xl">
            E-Commerce
          </div>
          <div className="border-primay border-solid pb-13 text-3xl md:mr-4 md:border-b-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            explicabo ea illo perspiciatis cumque tenetur omnis sapiente
            doloremque iusto facere ad rem praesentium dolor ducimus culpa
            magnam, perferendis voluptatibus sunt!
          </div>
        </div>
        <div className="h-100 shrink-0 p-1 md:h-full lg:w-3/10">
          <ImageLoader
            src={'/assets/mainPic.jpg'}
            customClass="rounded-md"
            alt="Main Picture"
          />
        </div>
      </div>
    </>
  );
}
