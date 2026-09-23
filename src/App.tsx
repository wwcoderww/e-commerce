import LandingPage from './features/landingPage/LandingPage';
import maingBg from './assets/mainBg.jpg';

export default function App() {
  return (
    <div
      style={{ backgroundImage: `url(${maingBg})` }}
      className="bg-cover bg-center bg-no-repeat font-sans text-primary subpixel-antialiased"
    >
      <LandingPage />
    </div>
  );
}
