import { Nav } from './components/nav'
import './App.css'
import { useAppDispatch } from './hooks/store';
import { useEffect } from 'react';
import { loadUser } from './store/auth/slice';
import MainNav from './components/nav-main';

function App() {
const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <MainNav> 
      </MainNav>
      <Nav></Nav>
    </>
  );
}

export default App
