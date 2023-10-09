import React, { useState, useEffect } from 'react';
import DateSelector from './DateSelector';

const DateApp = ({
  totalPersonas,
  totalImporte,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  paymentDates,
  setPaymentDates,
  setRows,
  rows
}) => {
  const maxDateCount = 4; // Máximo de cuotas
  const currentDate = (new Date());
  const [error, setError] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [editIndex, setEditIndex] = useState(-1);


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e, setterFunction) => {
    setterFunction(e.target.value);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const calculateCuotas = (dates) => {
    const totalCuotas = totalImporte / dates.length;
    return Array.from({ length: totalPersonas }, () =>
      Array.from({ length: dates.length }, () => totalCuotas)
    );
  };

  // useEffect(() => {
  //   if (totalImporte > 0 && paymentDates.size > 0) {
  //     const initialCuotas = calculateCuotas([...paymentDates]);
  //     setCuotasStates(initialCuotas);
  //   }
  // }, [totalImporte, paymentDates]);

  const handleValidateDateClick = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const selectedDate = new Date(
        parseInt(selectedYear, 10),
        parseInt(selectedMonth, 10) - 1,
        parseInt(selectedDay, 10)
      );

      if (selectedDate >= currentDate) {
        if (editIndex !== -1) {
          const updatedDates = [...paymentDates];
          updatedDates[editIndex] = formatDate(selectedDate);

          setPaymentDates(new Set(updatedDates));
          setEditIndex(-1);
        } else if (
          paymentDates.size < maxDateCount &&
          ![...paymentDates].includes(formatDate(selectedDate))
        ) {
          setPaymentDates(new Set([...paymentDates, formatDate(selectedDate)]));
          setSelectedDay('');
          setSelectedMonth('');
          setSelectedYear('');
          setError('');
        } else {
          setError('Has alcanzado el límite máximo de cuotas o la fecha ya existe.');
        }

        
        setEditIndex(-1);
      } else {
        setError('La fecha seleccionada es anterior a la fecha actual.');
      }
    } else {
      setError('Por favor, selecciona una fecha válida.');
    }
  };

  const handleReviewDatesClick = () => {
    let hasError = false;

    for (const date of paymentDates) {
      const selectedDate = new Date(date);

      if (selectedDate < currentDate) {
        setError('Al menos una de las fechas es anterior a la fecha actual.');
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      setError('');
    }
  };


  const handleEditDateChange = (e, date, index, field) => {
    const updatedDates = [...paymentDates];
    const dateParts = date.split('-');
    const newDate = new Date(
      parseInt(dateParts[0], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[2], 10)
    );
  
    if (field === 'day') {
      newDate.setDate(parseInt(e.target.value, 10));
    } else if (field === 'month') {
      newDate.setMonth(parseInt(e.target.value, 10) - 1);
    } else if (field === 'year') {
      newDate.setFullYear(parseInt(e.target.value, 10));
    }
  
    updatedDates[index] = formatDate(newDate);
    setPaymentDates(new Set(updatedDates));
  };
  

  return (
    <div>
      <DateSelector
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onDayChange={(e) => handleInputChange(e, setSelectedDay)}
        onMonthChange={(e) => handleInputChange(e, setSelectedMonth)}
        onYearChange={(e) => handleInputChange(e, setSelectedYear)}
      />
      <button className="btnDate" onClick={handleValidateDateClick}>
        {editIndex === -1 ? 'Agregar Fecha' : 'Editar Fecha'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Fechas de Pago:</h3>
        {paymentDates.size > 0 ? (
          <ul>
            {[...paymentDates].sort().map((date, index) => (
              <li key={index}>
                <DateSelector
                  selectedDay={date.split('-')[2]}
                  selectedMonth={date.split('-')[1]}
                  selectedYear={date.split('-')[0]}
                  onDayChange={(e) => handleEditDateChange(e, date, index, 'day')}
                  onMonthChange={(e) => handleEditDateChange(e, date, index, 'month')}
                  onYearChange={(e) => handleEditDateChange(e, date, index, 'year')}
                />
              </li>
            ))}
            <button className="btnDate" onClick={handleReviewDatesClick}>
              Revisar Fechas
            </button>
          </ul>
        ) : (
          <p>No hay fechas de pago.</p>
        )}
      </div>
    </div>
  );
};

export default DateApp;

