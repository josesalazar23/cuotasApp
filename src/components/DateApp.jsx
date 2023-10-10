import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedMonth,
  setSelectedYear,
  setError,
  setSelectedDay,
  setEditIndex,
} from "../reducers/payment/paymentSlice";
import DateSelector from './DateSelector';

const DateApp = ({ paymentDates, setPaymentDates}) => {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.payment.selectedDay) || '01';
const selectedMonth = useSelector((state) => state.payment.selectedMonth) || '01';
const selectedYear = useSelector((state) => state.payment.selectedYear) || new Date().getFullYear().toString();
  const error = useSelector((state) => state.payment.error);
  const editIndex = useSelector((state) => state.payment.editIndex);

  const maxDateCount = 4; // Máximo de cuotas
  const currentDate = new Date();

  

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e, setterFunction) => {
    setterFunction(e.target.value);
  };

  const handleValidateDateClick = () => {
    console.log('Botón Agregar Fecha presionado');
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
          dispatch(setEditIndex(-1));
        } else {
          dispatch(setError('')); 

          for (const date of paymentDates) {
            const existingDate = new Date(date);

            if (
              existingDate.getDate() === selectedDate.getDate() &&
              existingDate.getMonth() === selectedDate.getMonth() &&
              existingDate.getFullYear() === selectedDate.getFullYear()
            ) {
              dispatch(setError('La fecha ya existe.'));
              return; 
            }
          }

          if (paymentDates.size < maxDateCount) {
            setPaymentDates(new Set([...paymentDates, formatDate(selectedDate)]));
          } else {
            dispatch(setError('Has alcanzado el límite máximo de cuotas.'));
          }
        }
      } else {
        dispatch(setError('La fecha seleccionada es anterior a la fecha actual.'));
      }
    } else {
      dispatch(setError('Por favor, selecciona una fecha válida.'));
    }
  };

  useEffect(() => {
    dispatch(setSelectedDay(''));
    dispatch(setSelectedMonth(''));
    dispatch(setSelectedYear(''));
    dispatch(setError(''));
  }, [paymentDates]);

  const handleReviewDatesClick = () => {
    let hasError = false;

    for (const date of paymentDates) {
      const selectedDate = new Date(date);

      if (selectedDate < currentDate) {
        dispatch(setError('Al menos una de las fechas es anterior a la fecha actual.'));
        hasError = true;
        break;
      }
    }

    if (!hasError) {
      dispatch(setError(''));
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
        onDayChange={(e) => handleInputChange(e, (value) => dispatch(setSelectedDay(value)))}
        onMonthChange={(e) => handleInputChange(e, (value) => dispatch(setSelectedMonth(value)))}
        onYearChange={(e) => handleInputChange(e, (value) => dispatch(setSelectedYear(value)))}
      />
      <button className="btnDate" onClick={handleValidateDateClick}>
        {"Añadir Fecha"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h4>Fechas de Pago:</h4>
        {paymentDates.size > 0 && (
          <ul>
            {[...paymentDates].sort().map((date, index) => (
              <li key={index}>
                <h4>Pago {index + 1}</h4>
                
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
        )}
      </div>
    </div>
  );
};

export default DateApp;


