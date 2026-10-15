'use client';
import ImageLoader from '@/components/imageLoader';

export default function LandingPage() {
  return (
    <>
      <div className="flex h-full flex-1 flex-col md:flex-row md:pt-10">
        <div className="flex flex-col gap-12 p-4 md:h-full md:w-6/10 md:items-stretch md:p-0 md:pl-4 lg:w-7/10 lg:justify-center lg:pl-25">
          <div className="border-primay border-b-2 border-solid pb-4 text-center text-5xl font-extrabold md:border-0 md:text-start md:text-7xl lg:text-8xl">
            E-Commerce
          </div>
          <div className="border-primay border-solid pb-13 text-3xl md:mr-4 lg:border-b-2">
            <u>
              For admin account email='a@a.com' pass='aaaaaaaaaa' (10 a's).Then
              click profile icon and go to admin panel. Ipad/Computer only
            </u>{' '}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            explicabo ea illo perspiciatis cumque tenetur omnis sapiente
            doloremque iusto facere ad rem praesentium dolor ducimus culpa
            magnam, quod, voluptatibus voluptates.
          </div>
        </div>
        <div className="my-auto h-140 shrink-0 p-1 md:w-4/10 lg:h-full lg:w-3/10">
          <ImageLoader
            src={'/assets/mainPic.jpg'}
            customClass="rounded-md object-fill"
            alt="Main Picture"
          />
        </div>
      </div>
    </>
  );
}
