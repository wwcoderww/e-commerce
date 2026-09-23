import Banner from './components/Banner';
import bgImage from './assets/mainBg.jpg';
import mainPic from './assets/mainPic.jpg';

export default function LandingPage() {
  // Commit redo
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="flex min-h-screen max-w-screen flex-col bg-cover bg-center bg-no-repeat"
    >
      <Banner />
      <div className="flex w-screen flex-1 gap-8 pt-10">
        <div className="flex w-1/2 flex-col gap-8 px-10">
          <div className="mt-[25vh] text-7xl">E-Commerce</div>
          <div className="max-w-200 text-2xl">
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
    </div>
  );
}
