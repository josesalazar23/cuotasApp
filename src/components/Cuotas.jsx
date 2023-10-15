import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCuotasStates,
  setTableRows,
} from '../reducers/payment/paymentSlice';

const Cuotas = ({ dateAdded, recalculateCuotas }) => {
  const dispatch = useDispatch();
  const totalImporte = useSelector((state) => state.payment.totalImporte);
  const cuotasStates = useSelector((state) => state.payment.cuotasStates);
  const installmentDates = useSelector((state) => state.payment.installmentDates);
  const [perRow, setPerRow] = useState("");
  const [renderer, setRenderer] = useState(0);
  const rows = useSelector((state) => state.payment.tableRows);
  const [previousTotalPersonas, setPreviousTotalPersonas] = useState();

  useEffect(() => {
    if (cuotasStates.length === 0) {
      const initialCuotas = installmentDates.map(() => Math.ceil(totalImporte / installmentDates.length));
      dispatch(setCuotasStates([initialCuotas]));
    }
  }, []);

  const addNewRow = () => {
    const newRow = {
      position: 1,
      peopleFrom: previousTotalPersonas,
      peopleTo: perRow,
      totalCost: 0,
      values: recalculateCuotas(0, installmentDates.length), // Recalcula las cuotas
    };
    dispatch(setTableRows([...rows, newRow]));
    setPreviousTotalPersonas(perRow);
    setPerRow(perRow);
  };

  useEffect(() => {
    const getNewRow = (rw) => {
      const newrow = rw.map((r) => {
        return {
          position: r.length,
          peopleFrom: r.peopleFrom,
          peopleTo: r.peopleTo,
          totalCost: r.totalCost,
          values: recalculateCuotas(r.totalCost, installmentDates.length), // Recalcula las cuotas
        };
      });
      setRenderer(renderer + 1);
      if (newrow.length > 0) {
        console.log('installment effect', installmentDates.length);
        dispatch(setTableRows(newrow));
      }
      return rw;
    };
    let theRows = [...rows];
    if (installmentDates.length > 0) {
      console.log('installment effect', installmentDates.length);
      let dd = getNewRow(theRows);
    }
  }, [dateAdded]);

  const handleCuotaChange = (nv, valueIndex, rowIndex) => {
    // Manejar el cambio de cuota
    const updatedRows = rows.map((row, rIndex) => {
      if (rowIndex !== rIndex) {
        return row;
      }
      return {
        ...row,
        values: row.values.map((v, vIndex) => {
          if (vIndex === valueIndex) {
            return parseFloat(nv);
          } else {
            const newC = row.totalCost - parseFloat(nv);
            const division = installmentDates.length - 1;
            return Math.ceil(newC / division);
          }
        }),
      };
    });
    dispatch(setTableRows(updatedRows));
    setTimeout(1000);
    setRenderer(renderer + 1);
  };

  const handleMasPersonasClick = () => {
    addNewRow();
  };

  const editRow = (index, value, field) => {
    let newRow = {
      ...rows[index],
    };
    if (field === 'totalCost') {
      newRow[field] = parseFloat(value);
      newRow.values = recalculateCuotas(parseFloat(value), installmentDates.length); // Recalcula las cuotas
    } else {
      newRow[field] = value;
    }

    const updatedRows = rows.map((row, rIndex) => {
      if (index !== rIndex) {
        return row;
      }
      return newRow;
    });
    dispatch(setTableRows(updatedRows));
  };

  return (
    <div>
      <div>
        <div>
          <div className="table-container">
            <table className="cuotas-table scrollable-table">
              <thead>
                <tr>
                  <th className='editable-total'>Número de Personas</th>
                  <div  >
                    <th className='th-total'>TOTAL</th>
                  </div>
                  
                  {installmentDates.map((date, index) => (
                    <th key={index}>{`PAGO ${date.position} (${date.fullDate})`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="people-table">
                        <div className="td-personas">
                          <input
                            className="people-table"
                            type="text"
                            step="0.01"
                            value={row.peopleFrom}
                            onChange={(e) => editRow(rowIndex, e.target.value, 'peopleFrom')}
                          />
                          {' - '}
                          <input
                            className="people-table"
                            type="text"
                            step="0.01"
                            value={row.peopleTo}
                            onChange={(e) => editRow(rowIndex, e.target.value, 'peopleTo')}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="editable-total">
                          <input
                            type="text"
                            step="0.01"
                            value={row.totalCost}
                            onChange={(e) => editRow(rowIndex, e.target.value, 'totalCost')}
                          />
                        </div>
                      </td>
                      {row.values && row.values.map((value, valueIndex) => (
                        <td key={valueIndex}>
                          <input
                            type="text"
                            step="0.01"
                            value={value}
                            onChange={(e) => handleCuotaChange(e.target.value, valueIndex, rowIndex)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button className="btnDate" onClick={handleMasPersonasClick}>
            + Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cuotas;