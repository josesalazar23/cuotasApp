import React, { useState } from 'react';
import DateApp from './DateApp';
import Inicio from './Inicio';
import Cuotas from './Cuotas';

const Home = () => {
  const [totalPersonas, setTotalPersonas] = useState('');
  const [totalImporte, setTotalImporte] = useState('');
  const [totalPorcentaje, setTotalPorcentaje] = useState(30);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [newDateCount, setNewDateCount] = useState(1);
  const [paymentDates, setPaymentDates] = useState(new Set());
  const [showTable, setShowTable] = useState(false);
  const [mostrarInicio, setMostrarInicio] = useState(true);
  const [rows, setRows] = useState([]);

  const handleAddClick = () => {
    // Verifica que los tres campos tengan valores y que totalPorcentaje sea mayor o igual a 30
    if (totalPersonas !== '' && totalImporte !== '' && totalPorcentaje >= 30) {
      setShowTable(true);
      setMostrarInicio(false);
    }
    if (totalPorcentaje < 30) {
      alert(`El valor del porcentaje puede ser menor que 30`);
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

      {showTable && (
        <div>
          <DateApp
            totalPersonas={totalPersonas}
            totalImporte={totalImporte}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            paymentDates={paymentDates}
            setPaymentDates={setPaymentDates}
            setRows={setRows}
            rows={rows}
          />
        </div>
      )}

      <div>
        {showTable && (
          <Cuotas
            totalImporte={totalImporte}
            paymentDates={[...paymentDates]}
            totalPersonas={totalPersonas}
            totalPorcentaje={totalPorcentaje}
            setTotalPorcentaje={setTotalPorcentaje}
            rows={rows}
            setRows={setRows}
          />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Home;






