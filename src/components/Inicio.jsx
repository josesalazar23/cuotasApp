import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTotalPersonas,
  setTotalImporte,
  setTotalPorcentaje,
  setShowTable,
  setMostrarInicio,
  setCuotasStates,
} from "../reducers/payment/paymentSlice";

const Inicio = () => {
  const dispatch = useDispatch();
  const totalPersonas = useSelector((state) => state.payment.totalPersonas);
  const totalImporte = useSelector((state) => state.payment.totalImporte);
  const totalPorcentaje = useSelector((state) => state.payment.totalPorcentaje);
  const cuotasStates = useSelector((state) => state.payment.cuotasStates)

  useEffect(() => {
    if (totalPorcentaje >= 30 && totalImporte !== '') {
      const primeraCuota = (totalImporte * totalPorcentaje) / 100;
      const nuevasCuotas = [primeraCuota, ...cuotasStates.slice(1)];
      dispatch(setCuotasStates(nuevasCuotas));
    }
  }, [totalPorcentaje, cuotasStates, dispatch]);

  const handleAddClick = () => {
    if (totalPersonas !== '' && totalImporte !== '' && totalPorcentaje >= 30) {
      dispatch(setShowTable(true));
      dispatch(setMostrarInicio(false));
    }
    if (totalPorcentaje < 30) {
      alert(`El valor del porcentaje puede ser menor que 30`);
    }
  };

  const handleInputChange = (e, setterFunction, minValue = null) => {
    const value = e.target.value;

    if (!isNaN(value)) {
      if (minValue !== null && parseInt(value, 10) < minValue) {
        alert(`El valor no puede ser menor que ${minValue}`);
      } else {
        setterFunction(value);
      }
    }
  };

  const handleAddDataClick = () => {
    if (totalPersonas !== '' && totalImporte !== '' && totalPorcentaje !== '') {
      handleAddClick(); 
    }
  };

  return (
    <div className='containerInitialApp'>
      <div className='inicio'>
        <div>
          <label className="label"><h2>Total de Personas:</h2></label>
          <input
            className="input-number"
            type="number"
            step="1"
            value={totalPersonas}
            onChange={(e) => handleInputChange(e, (value) => dispatch(setTotalPersonas(value)))}
          />
        </div>
        <div>
          <label className="label"><h2>Importe Total:</h2></label>
          <input
            className="input-number"
            type="number"
            step="1"
            value={totalImporte}
            onChange={(e) => handleInputChange(e, (value) => dispatch(setTotalImporte(value)))}
          />
        </div>
        <div className='btnContainer'>
          <button className="btnAñadir" onClick={handleAddDataClick}>Consultar</button>
        </div>
      </div>
    </div>
  );
};

export default Inicio;