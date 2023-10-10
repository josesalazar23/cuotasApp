import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCuotasStates,
  setPorcentajeReduccion,
  setTotalPersonas,
} from "../reducers/payment/paymentSlice";

const Cuotas = ({
  paymentDates,
}) => {
  const dispatch = useDispatch();
  const totalImporte = useSelector((state) => state.payment.totalImporte);
  const cuotasStates = useSelector((state) => state.payment.cuotasStates);
  const porcentajeReduccion = useSelector((state) => state.payment.porcentajeReduccion);
  const [perRow, setPerRow] = useState(50);
  const [renderer, setRenderer] = useState(0);
  const [rows, setRows] = useState([]);
  const [previousTotalPersonas, setPreviousTotalPersonas] = useState(0);

  useEffect(() => {
    if (cuotasStates.length === 0) {
      const initialCuotas = paymentDates.map(() => totalImporte / paymentDates.length);
      dispatch(setCuotasStates([initialCuotas]));
    }
    if (rows.length === 0) {
      addNewRow();
    }
  }, []);

  const addNewRow = () => {
    const nuevoTotal = totalImporte * (1 - porcentajeReduccion / 100);
    const newRow = {
      persona: `${previousTotalPersonas + 1} - ${perRow}`,
      importeTotal: nuevoTotal.toFixed(2),
      values: paymentDates.map(() => nuevoTotal / paymentDates.length),
    };
    setRows([...rows, newRow]);
    dispatch(setPorcentajeReduccion(porcentajeReduccion + 10));
    setPreviousTotalPersonas(perRow); // Actualizamos el valor anterior de personas
    setPerRow(perRow + 50);
    dispatch(setTotalPersonas(perRow + 50));
  };

  useEffect(() => {
    const getNewRow = (rw) => {
      rw.map((r) => {
        r.values = paymentDates.map(() => r.importeTotal / paymentDates.length);
        return r;
      });
      setRenderer(renderer + 1);
      return rw;
    };
    let dd = getNewRow(rows);
  }, [paymentDates]);

  const handleCuotaChange = (nv, valueIndex, rowIndex) => {
    rows[rowIndex].values[valueIndex] = parseFloat(nv) || 0;
    let nuevalor = rows[rowIndex].importeTotal - rows[rowIndex].values[valueIndex];
    rows[rowIndex].values.forEach((element, index) => {
      const calculo = nuevalor / (rows[rowIndex].values.length - 1);
      if (index !== valueIndex) {
        rows[rowIndex].values[index] = calculo;
      }
    });
    setTimeout(1000);
    setRenderer(renderer + 1);
  };

  const handleMasPersonasClick = () => {
    addNewRow();
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '100%' }}>
          <table className="cuotas-table" name={renderer}>
            <thead>
              <tr>
                <th>Número de Personas</th>
                <th>Total</th>
                {paymentDates.map((date, index) => (
                  <th key={index}>{`Cuota ${index + 1} (${date})`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paymentDates && rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.persona}</td>
                  <td>{row.importeTotal}</td>
                  {row.values.map((cuota, index) => (
                    <td key={index}>
                      <input
                        type="number"
                        step="0.01"
                        value={cuota.toFixed(2)}
                        onChange={(e) =>
                          handleCuotaChange(e.target.value, index, rowIndex)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btnDate" onClick={handleMasPersonasClick}>+ Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default Cuotas;








