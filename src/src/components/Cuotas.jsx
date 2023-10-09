import React, { useState, useEffect } from 'react';

const Cuotas = ({
  totalImporte,
  paymentDates,
  totalPersonas,
  totalPorcentaje,
  setTotalPorcentaje,
  rows,
  setRows
}) => {
  const [cuotasStates, setCuotasStates] = useState([]);
  const [porcentajeReduccion, setPorcentajeReduccion] = useState(0);
  const [perRow, setPerRow] = useState(totalPersonas);
  
  const [renderer, setRenderer] = useState(0);


  useEffect(() => {
    if (cuotasStates.length === 0) {
      const initialCuotas = paymentDates.map(() => totalImporte / paymentDates.length);
      setCuotasStates([initialCuotas]);
    }
    if(rows.length == 0) {
      addNewRow()
    }
  }, []);

  const addNewRow = () => {
    const nuevoTotal = totalImporte * (1 - porcentajeReduccion / 100);
      const row = {
        persona: perRow,
        importeTotal: nuevoTotal.toFixed(2),
        values: paymentDates.map(() => nuevoTotal / paymentDates.length)
      }
      setRows([...rows, row])
      setPorcentajeReduccion(porcentajeReduccion + 10);
      setPerRow(perRow + 50)
  }

  useEffect(() => {

    const getNewRow = async (rw) => {
      rw.map((r) => {
        r.values = paymentDates.map(() => r.importeTotal / paymentDates.length)
        return r
      })
      setRenderer(renderer+1)
      return rw
    }
    let dd = getNewRow(rows)
  }, [paymentDates])


  const handleCuotaChange = async (nv, valueIndex, rowIndex) => {
    
    rows[rowIndex].values[valueIndex] = parseFloat(nv) || 0;
    let nuevalor = rows[rowIndex].importeTotal - rows[rowIndex].values[valueIndex]
    await rows[rowIndex].values.forEach((element, index) => {
      const calculo = nuevalor / (rows[rowIndex].values.length - 1)
      console.log("haciendo la vaina esta", index, valueIndex, nuevalor, calculo)

      if (index != valueIndex) {
        rows[rowIndex].values[index] = calculo
      }
    });
    setTimeout(1000)
    
    setRenderer(renderer+1)

  };

  const handleMasPersonasClick = () => {
    addNewRow()

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
              {paymentDates  && rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{row.persona}</td>
                  <td>{row.importeTotal}</td>
                  {row.values.map((cuota, index) => (
                    <td key={index}>
                      <input
                        type="number"
                        step="0.01"
                        value={cuota}
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
            <button className="btnDate" onClick={handleMasPersonasClick}>Más Personas</button>
        </div>
      </div>
    </div>
  );
};

export default Cuotas;














