import mainPic from './assets/mainPic.jpg';

export default function LandingPage() {
  return (
    <>
      <div className="flex h-screen w-screen flex-1 pt-10">
        <div className="flex w-6/10 flex-col gap-12 pl-25">
          <div className="mt-[22vh] text-8xl">E-Commerce</div>
          <div className="border-primay border-b-2 border-solid pb-14 text-3xl">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "The
            quick brown fox jumps over the lazy dog.", "React makes it painless
            to create interactive UIs.", "State updates tell React that a
            component needs rendering.", "Keep your components small and
            focused."
          </div>
        </div>
        <div className="flex w-4/10 items-end">
          <img
            src={mainPic}
            className="ml-auto max-h-[85vh] rounded-md"
            alt="mainPic"
          />
        </div>
      </div>
    </>
  );
}
