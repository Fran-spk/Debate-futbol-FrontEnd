import { Nav } from './components/nav'
import './App.css'
import { useAppDispatch } from './hooks/store';
import { useEffect } from 'react';
import { loadUser } from './store/auth/slice';

function App() {
const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Nav></Nav>
  );
}

export default App
