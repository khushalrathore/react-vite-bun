import { createRoot } from 'react-dom/client';
import { Routes } from './routes/routes.jsx';
import './styles/globals.css';
import { UserProvider } from './contexts/User.jsx';

const Providers = () => {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
};

export const App = () => {
  return (
    <Providers />
  );
};

createRoot(document.getElementById('root')).render(
  <App />
);
