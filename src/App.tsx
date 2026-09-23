import bgImage from './assets/mainBg.jpg';

export default function App() {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="min-h-screen bg-cover bg-center"
    >
      <div className="text-9xl text-amber-300">App</div>
    </div>
  );
}
