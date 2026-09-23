// import Banner from './components/Banner';
import bgImage from './assets/mainBg.jpg';

export default function LandingPage() {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="min-h-screen bg-cover bg-center"
    >
      {/* <Banner /> */}
      <div className="text-9xl text-amber-300">App</div>
    </div>
  );
}
