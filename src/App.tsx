import { Outlet } from 'react-router-dom';
import maingBg from './assets/mainBg.jpg';

export default function App() {
  return (
    <div
      style={{ backgroundImage: `url(${maingBg})` }}
      className="flex h-screen max-w-screen flex-col bg-cover bg-center bg-no-repeat font-sans text-primary subpixel-antialiased"
    >
      <Outlet />
    </div>
  );
}
