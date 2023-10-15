import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedMonth,
  setSelectedYear,
  setError,
  setSelectedDay,
  setInstallmentDates,
  setTableRows,
} from "../reducers/payment/paymentSlice";
import DateSelector from './DateSelector';

const DateApp = ({setDateAdded, dateAdded, recalculateCuotas }) => {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.payment.selectedDay);
  const selectedMonth = useSelector((state) => state.payment.selectedMonth);
  const selectedYear = useSelector((state) => state.payment.selectedYear);
  const error = useSelector((state) => state.payment.error);
  const [resetFields, setResetFields] = useState(false);
  const installmentDates = useSelector((state) => state.payment.installmentDates) || [];
  const rows = useSelector((state) => state.payment.tableRows);
  const currentDate = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatInstallment = (date, position) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return {
      position: position,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      fullDate: `${year}-${month}-${day}`
    };
  };

  const handleInputChange = (e, setterFunction) => {
    setterFunction(e.target.value);
  };

  const addNewDate = () => {
    dispatch(setError(''));
  
    const selectedYearInt = parseInt(selectedYear, 10);
    const newDate = new Date(
      selectedYearInt,
      parseInt(selectedMonth, 10) - 1,
      parseInt(selectedDay, 10)
    );
  
    if (newDate < currentDate) {
      dispatch(setError('Fecha incorrecta. Es anterior a la fecha actual.'));
      return;
    }
    for (const ins of installmentDates) {
      if (formatDate(newDate) === ins.fullDate) {
        dispatch(setError('La fecha ya existe.'));
        return;
      }
    }
    const updatedInstallmentDates = [...installmentDates, formatInstallment(newDate, dateAdded + 1)];
    // Llama a la función para ordenar y renumerar las fechas
    const sortedDates = sortAndRenumberDates(updatedInstallmentDates);
  
    dispatch(setInstallmentDates(sortedDates));
    setDateAdded(dateAdded + 1);
  };

  useEffect(() => {
    if (resetFields) {
      dispatch(setSelectedDay(''));
      dispatch(setSelectedMonth(''));
      dispatch(setSelectedYear(''));
      setResetFields(false);
    }
  }, [resetFields, dispatch]);

  const editDate = (e, date, index, field) => {
    const updatedInstallments = [...installmentDates];
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

    updatedInstallments[index] = formatInstallment(newDate, installmentDates[index].position);
    dispatch(setInstallmentDates(updatedInstallments));
  };

  const deleteDate = (dateIndex) => {
    const updatedInstallments = [...installmentDates];
    updatedInstallments.splice(dateIndex, 1);
    dispatch(setInstallmentDates(updatedInstallments));
  
    const sortedDates = updatedInstallments.map((date, index) => ({
      ...date,
      position: index + 1,
    }));
  
    dispatch(setInstallmentDates(sortedDates));
  
    const updatedRows = rows.map((row) => ({
      ...row,
      values: row.values.filter((_, index) => index !== dateIndex),
    }));
  
    // Aquí llamas a la función para recalcular las cuotas
    updatedRows.forEach((row) => {
      row.values = recalculateCuotas(row.totalCost, updatedInstallments.length);
    });
  
    dispatch(setTableRows(updatedRows));
  };

  

  const sortAndRenumberDates = (dates) => {
    // Ordena las fechas de menor a mayor
    dates.sort((a, b) => a.fullDate.localeCompare(b.fullDate));
    
    // Actualiza la posición de los pagos en función de la nueva ordenación de fechas
    const updatedDates = dates.map((date, index) => ({
      ...date,
      position: index + 1,
    }));
  
    return updatedDates;
  };

  return (
    <div>
      <div>
        <h3>Fechas de Pago:</h3>
        <div className='fechaAgregada'>
            <DateSelector
              onDayChange={(e) => handleInputChange(e, (value) => dispatch(setSelectedDay(value)))}
              onMonthChange={(e) => handleInputChange(e, (value) => dispatch(setSelectedMonth(value)))}
              onYearChange={(e) => handleInputChange(e, (value) => dispatch(setSelectedYear(value)))}
            />
            <button className="btnDate" onClick={addNewDate}>
              {"Añadir Fecha"}
            </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {installmentDates.length > 0 && (
          <ul>
            {installmentDates.map((installment, index) => (
              <li key={installment.position}>
                <h4>Pago {installment.position}</h4>
                <div className='fechaAgregada'>
                  <DateSelector
                    selectedDay={installment.fullDate.split('-')[2]}
                    selectedMonth={installment.fullDate.split('-')[1]}
                    selectedYear={installment.fullDate.split('-')[0]}
                    onDayChange={(e) => editDate(e, installment.fullDate, index, 'day')}
                    onMonthChange={(e) => editDate(e, installment.fullDate, index, 'month')}
                    onYearChange={(e) => editDate(e, installment.fullDate, index, 'year')}
                  />
                  <button className='btnDate' onClick={() => deleteDate(index)}> Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DateApp;



