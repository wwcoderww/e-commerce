import mainPic from './assets/mainPic.jpg';

export default function LandingPage() {
  return (
    <>
      <div className="flex h-screen w-screen flex-1 pt-10">
        <div className="flex w-1/2 flex-col gap-12 px-10">
          <div className="mt-[25vh] text-8xl">E-Commerce</div>
          <div className="text-3xl">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "The
            quick brown fox jumps over the lazy dog.", "React makes it painless
            to create interactive UIs.", "State updates tell React that a
            component needs rendering.", "Keep your components small and
            focused."
          </div>
        </div>
        <div className="flex w-1/2 items-end">
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
