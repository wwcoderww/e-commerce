'use client';
import ImageLoader from '@/components/imageLoader';

export default function LandingPage() {
  return (
    <>
      <div className="flex h-full flex-1 flex-col md:flex-row md:pt-10">
        <div className="flex h-full flex-col gap-12 p-4 md:w-6/10 md:p-0 md:pl-10 lg:w-7/10 lg:pl-25">
          <div className="border-primay border-b-2 border-solid pb-4 text-center text-5xl md:border-0 md:p-0 md:text-start md:text-8xl lg:mt-[22vh]">
            E-Commerce
          </div>
          <div className="border-primay border-solid pb-13 text-3xl md:mr-4 md:border-b-2">
            <u>
              For admin account email='a@a.com' pass='aaaaaaaaaaaaa'.Then click
              profile icon and go to admin panel.
            </u>{' '}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            explicabo ea illo perspiciatis cumque tenetur omnis sapiente
            doloremque iusto facere ad rem praesentium dolor ducimus culpa
            magnam, quod, voluptatibus voluptates.
          </div>
        </div>
        <div className="h-140 shrink-0 p-1 md:h-full md:w-4/10 lg:w-3/10">
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
