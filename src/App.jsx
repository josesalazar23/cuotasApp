import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadInitialData } from './reducers/payment/paymentSlice';
import Home from './components/Home';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInitialData()); // Carga la primera vez utilizando Redux 
  }, [dispatch]);


  return (
    
      <Home />
    
  );
}

export default App;
