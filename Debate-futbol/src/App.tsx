import { Nav } from './components/nav'
import './App.css'
import { useAppDispatch } from './hooks/store';
import { useEffect } from 'react';
import { loadUser, setNotifications } from './store/auth/slice';
import MainNav from './components/nav-main';
import { notificationService } from './services/notificationServices';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());

    const loadNotifications = async () => {
      try {
        const notifications = await notificationService.getAll();

        if (notifications && notifications.length > 0) {
          dispatch(setNotifications(true));
        }
      } catch (error) {
        console.error("Error cargando notificaciones", error);
      }
    };

    loadNotifications();
  }, [dispatch]);

 return (
    <>
      <MainNav> 
      </MainNav>
      <Nav></Nav>
    </>

    
  );
}

export default App;
