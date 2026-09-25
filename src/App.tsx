import { Outlet } from 'react-router-dom';
import maingBg from './assets/mainBg.jpg';
import Banner from './components/Banner';

export default function App() {
  return (
    <div
      style={{ backgroundImage: `url(${maingBg})` }}
      className="flex min-h-screen flex-col bg-cover bg-fixed bg-center bg-no-repeat font-sans text-primary subpixel-antialiased"
    >
      <Banner />
      <Outlet />
    </div>
  );
}
