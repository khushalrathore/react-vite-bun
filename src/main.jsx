import { createRoot } from 'react-dom/client';
import { Routes } from './routes/routes.jsx';
import './styles/globals.css';
import { UserProvider } from './contexts/User.jsx';

const Providers = () => {
  return (
    <div className='providers'>
      <UserProvider>
        <Routes />
      </UserProvider>
    </div>
  );
};

export const App = () => {
  return (
    <div className='app'>
      <Providers />
    </div>
  );
};

createRoot( document.getElementById( 'root' ) ).render(
  <div className='render'>
    <App />
  </div>
);
