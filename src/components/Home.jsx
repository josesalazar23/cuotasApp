import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTotalPersonas,
  setTotalImporte,
  setTotalPorcentaje,
  setSelectedMonth,
  setSelectedYear,
  setShowTable,
  setMostrarInicio,
  setError,
  setSelectedDay,
  setEditIndex,
  setCuotasStates,
  setPorcentajeReduccion,
} from '../reducers/payment/paymentSlice';

import DateApp from './DateApp';
import Inicio from './Inicio';
import Cuotas from './Cuotas';

const Home = () => {
  const dispatch = useDispatch();
  const mostrarInicio = useSelector((state) => state.payment.mostrarInicio);
  const showTable = useSelector((state) => state.payment.showTable);
  const [paymentDates, setPaymentDates] = useState(new Set());

  useEffect(() => {
    dispatch(setTotalPersonas());
    dispatch(setTotalImporte(""));
    dispatch(setTotalPorcentaje(30));
    dispatch(setSelectedMonth(1));
    dispatch(setSelectedYear(new Date().getFullYear()));
    dispatch(setShowTable(false));
    dispatch(setMostrarInicio(true));
    dispatch(setError(""));
    dispatch(setSelectedDay(""));
    dispatch(setEditIndex(-1));
    dispatch(setCuotasStates([]));
    dispatch(setPorcentajeReduccion(0));
  }, [dispatch]);

  return (
    <div className="paymentApp">
      {!mostrarInicio && (
        <div className='homeTextos'>
          <h3 className="inline-text">Información de pagos</h3>
        </div>
      )}

      {/* {mostrarInicio && ( 
        <div>
          <Inicio />
        </div>
      )} */}
      <div>
          <DateApp
            paymentDates={paymentDates}
            setPaymentDates={setPaymentDates}
          />
      </div>

      <div>
        
        <Cuotas
          paymentDates={[...paymentDates]}
        />
        
      </div>
      
      <div></div>
    </div>
  );
};

export default Home;
