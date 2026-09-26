import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <div className="flex h-screen w-screen flex-1 pt-10">
        <div className="flex w-6/10 flex-col gap-12 pl-25">
          <div className="mt-[22vh] text-8xl">E-Commerce</div>
          <div className="border-primay border-b-2 border-solid pb-13 text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            explicabo ea illo perspiciatis cumque tenetur omnis sapiente
            doloremque iusto facere ad rem praesentium dolor ducimus culpa
            magnam, perferendis voluptatibus sunt!
          </div>
        </div>
        <div className="w-1/10"></div>
        <div className="relative w-3/10">
          <Image
            src={'/assets/mainPic.jpg'}
            className="rounded-md"
            alt="Main Picture"
            fill
          />
        </div>
      </div>
    </>
  );
}
