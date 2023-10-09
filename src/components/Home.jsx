import React, { useState } from 'react';
import DateApp from './DateApp';
import Inicio from './Inicio';
import Cuotas from './Cuotas';

const Home = () => {
  const [totalPersonas, setTotalPersonas] = useState('');
  const [totalImporte, setTotalImporte] = useState('');
  const [totalPorcentaje, setTotalPorcentaje] = useState(30);
  const [datosAgregados, setDatosAgregados] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [newDateCount, setNewDateCount] = useState(1);
  const [paymentDates, setPaymentDates] = useState(new Set());
  const [showCuotas, setShowCuotas] = useState(false);
  const [mostrarInputAdicional, setMostrarInputAdicional] = useState(false);
  const [mostrarInicio, setMostrarInicio] = useState(true);
  const [refreshCuotas, setRefreshCuotas] = useState(false);

  const handleAddClick = () => {
    // Verifica que los tres campos tengan valores y que totalPorcentaje sea mayor o igual a 30
    if (totalPersonas !== '' && totalImporte !== '' && totalPorcentaje >= 30) {
      const nuevoDato = {
        totalPersonas,
        totalImporte,
        totalPorcentaje,
      };
      setDatosAgregados([...datosAgregados, nuevoDato]);
      setShowCuotas(true);
      setMostrarInicio(false);
    }
  };

  return (
    <div className="paymentApp">
      <h2>Información de pagos</h2>

      {mostrarInicio && ( 
        <div>
          <Inicio
            totalPersonas={totalPersonas}
            setTotalPersonas={setTotalPersonas}
            totalImporte={totalImporte}
            setTotalImporte={setTotalImporte}
            totalPorcentaje={totalPorcentaje}
            setTotalPorcentaje={setTotalPorcentaje}
            handleAddClick={handleAddClick}
          />
        </div>
      )}

      {showCuotas && totalPersonas !== '' && totalImporte !== '' && totalPorcentaje >= 30 && (
        <div>
          <DateApp
            totalImporte={totalImporte}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            paymentDates={paymentDates}
            setPaymentDates={setPaymentDates}
            setShowCuotas={setShowCuotas}
            totalPorcentaje={totalPorcentaje}
          />
        </div>
      )}

      <div>
        {showCuotas && (
          <Cuotas
            totalImporte={totalImporte}
            paymentDates={[...paymentDates]}
            totalPersonas={totalPersonas}
            totalPorcentaje={totalPorcentaje}
            setTotalPorcentaje={setTotalPorcentaje}
            showCuotas={showCuotas}
            refreshCuotas={refreshCuotas}
            setRefreshCuotas={setRefreshCuotas}
          />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Home;






