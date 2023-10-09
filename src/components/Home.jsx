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


  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [error, setError] = useState('');
  // const [selectedDay, setSelectedDay] = useState('');
  // const [editIndex, setEditIndex] = useState(-1); // Índice de la fecha en edición (-1 si no hay edición)
  // const [editedDate, setEditedDate] = useState(''); // Fecha en edición
  // const [cuotasStates, setCuotasStates] = useState([]); // Estado para las cuotas

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
            onAddData={handleAddClick}
          />
        </div>
      )}

      {showCuotas && totalPersonas !== '' && totalImporte !== '' && totalPorcentaje >= 30 && (
        <div>
          <DateApp
            totalPersonas={totalPersonas}
            // setTotalPersonas={setTotalPersonas}
            totalImporte={totalImporte}
            // setTotalImporte={setTotalImporte}
            setTotalPorcentaje={setTotalPorcentaje}
            onAddData={handleAddClick}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            daysInMonth={daysInMonth}
            setDaysInMonth={setDaysInMonth}
            newDateCount={newDateCount}
            setNewDateCount={setNewDateCount}
            paymentDates={paymentDates}
            setPaymentDates={setPaymentDates}
            setShowCuotas={setShowCuotas}
            totalPorcentaje={totalPorcentaje}
            refreshCuotas={refreshCuotas}
            setRefreshCuotas={setRefreshCuotas}
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
            mostrarInputAdicional={mostrarInputAdicional}
            setMostrarInputAdicional={setMostrarInputAdicional}
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






