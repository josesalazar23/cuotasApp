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
  const [perRow, setPerRow] = useState();
  const [renderer, setRenderer] = useState(0);
  const [rows, setRows] = useState([]);
  const [previousTotalPersonas, setPreviousTotalPersonas] = useState(0);
  const [editableCostoTotal, setEditableCostoTotal] = useState(totalImporte.toString());
  const [originalCostoTotal, setOriginalCostoTotal] = useState(totalImporte);

  useEffect(() => {
    if (cuotasStates.length === 0) {
      const initialCuotas = paymentDates.map(() => Math.ceil(totalImporte / paymentDates.length));
      dispatch(setCuotasStates([initialCuotas]));
    }
    if (rows.length === 0) {
      addNewRow();
    }
  }, []);

  const addNewRow = () => {
    const nuevoTotal = 0 * (1 - porcentajeReduccion / 100);
    const newRow = {
      persona: '',
      costoTotal: '',
      values: paymentDates.map(() => ''),
    };
    setRows([...rows, newRow]);
    dispatch(setPorcentajeReduccion(porcentajeReduccion + 10));
    setPreviousTotalPersonas(perRow);
    setPerRow(perRow);
  };

  useEffect(() => {
    const getNewRow = (rw) => {
      rw.map((r) => {
        r.values = paymentDates.map(() => Math.ceil(r.costoTotal / paymentDates.length));
        return r;
      });
      setRenderer(renderer + 1);
      return rw;
    };
    let dd = getNewRow(rows);
  }, [paymentDates]);

  const handleCuotaChange = (nv, valueIndex, rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].values[valueIndex] = parseFloat(nv) || 0;
    setRows(updatedRows);
    let nuevalor = originalCostoTotal - rows[rowIndex].values[valueIndex];
    updatedRows[rowIndex].values.forEach((element, index) => {
      const calculo = Math.ceil(nuevalor / (updatedRows[rowIndex].values.length - 1));
      if (index !== valueIndex) {
        updatedRows[rowIndex].values[index] = calculo;
      }
    });
    setRows(updatedRows);
    setTimeout(1000);
    setRenderer(renderer + 1);
  };

  const handleMasPersonasClick = () => {
    addNewRow();
  };

  const handleEditableCostoTotalChange = (e, rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].costoTotal = e.target.value;
    setRows(updatedRows);
  };

  const handleEditableCostoTotalBlur = (rowIndex) => {
    const newCostoTotal = parseFloat(rows[rowIndex].costoTotal) || 0;
    if (newCostoTotal !== originalCostoTotal) {
      setOriginalCostoTotal(newCostoTotal);
      // Realiza la división automáticamente aquí.
      const updatedRows = [...rows];
      updatedRows[rowIndex].values = paymentDates.map(() => Math.ceil(newCostoTotal / paymentDates.length));
      setRows(updatedRows);
      setTimeout(1000);
      setRenderer(renderer + 1);
    }
  };
  const sortedPaymentDates = [...paymentDates].sort((a, b) => new Date(a) - new Date(b));

  return (
    <div>
      <div>
        <div>
          <div className="table-container">
            <table className="cuotas-table scrollable-table">
              <thead>
                <tr>
                  <th>Número de Personas</th>
                  <th>Costo Total</th>
                  {sortedPaymentDates.map((date, index) => (
                    <th key={index}>{`Pago ${index + 1} (${date})`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentDates && rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <div className='td-personas'>
                        <input
                          type="text"
                          step="0.01"
                          value={previousTotalPersonas}
                          onChange={(e) => setPreviousTotalPersonas(e.target.value)}
                        />
                        {" - "}
                        <input
                          type="text"
                          step="0.01"
                          value={row.persona}
                          onChange={(e) => {
                            const updatedRows = [...rows];
                            updatedRows[rowIndex].persona = e.target.value;
                            setRows(updatedRows);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="editable-total">
                        <input
                          type="text"
                          step="0.01"
                          value={row.costoTotal}
                          onChange={(e) => handleEditableCostoTotalChange(e, rowIndex)}
                          onBlur={() => handleEditableCostoTotalBlur(rowIndex)}
                        />
                      </div>
                    </td>
                    {row.values.map((cuota, index) => (
                      <td key={index}>
                        <input
                          type="text"
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
          </div>
          <button className="btnDate" onClick={handleMasPersonasClick}>+ Añadir</button>
        </div>
      </div>
    </div>
  );
};

export default Cuotas;












// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   setCuotasStates,
//   setPorcentajeReduccion,
//   setTotalPersonas,
// } from "../reducers/payment/paymentSlice";

// const Cuotas = ({
//   paymentDates,
// }) => {
//   const dispatch = useDispatch();
//   const totalImporte = useSelector((state) => state.payment.totalImporte);
//   const cuotasStates = useSelector((state) => state.payment.cuotasStates);
//   const porcentajeReduccion = useSelector((state) => state.payment.porcentajeReduccion);
//   const [perRow, setPerRow] = useState(50);
//   const [renderer, setRenderer] = useState(0);
//   const [rows, setRows] = useState([]);
//   const [previousTotalPersonas, setPreviousTotalPersonas] = useState(0);
  

//   useEffect(() => {
//     if (cuotasStates.length === 0) {
//       const initialCuotas = paymentDates.map(() => Math.ceil(totalImporte / paymentDates.length));
//       dispatch(setCuotasStates([initialCuotas]));
//     }
//     if (rows.length === 0) {
//       addNewRow();
//     }
//   }, []);

//   const addNewRow = () => {
//     const nuevoTotal = totalImporte * (1 - porcentajeReduccion / 100);
//     const newRow = {
//       persona: `${perRow}`,
//       importeTotal: Math.floor(nuevoTotal),
//       values: paymentDates.map(() => Math.ceil(nuevoTotal / paymentDates.length)),
//     };
//     setRows([...rows, newRow]);
//     dispatch(setPorcentajeReduccion(porcentajeReduccion + 10));
//     setPreviousTotalPersonas(perRow);
//     setPerRow(perRow + 50);
//   };

//   useEffect(() => {
//     const getNewRow = (rw) => {
//       rw.map((r) => {
//         r.values = paymentDates.map(() => Math.ceil(r.importeTotal / paymentDates.length));
//         return r;
//       });
//       setRenderer(renderer + 1);
//       return rw;
//     };
//     let dd = getNewRow(rows);
//   }, [paymentDates]);

//   const handleCuotaChange = (nv, valueIndex, rowIndex) => {
//     rows[rowIndex].values[valueIndex] = parseFloat(nv) || 0;
//     let nuevalor = rows[rowIndex].importeTotal - rows[rowIndex].values[valueIndex];
//     rows[rowIndex].values.forEach((element, index) => {
//       const calculo = Math.ceil(nuevalor / (rows[rowIndex].values.length - 1));
//       if (index !== valueIndex) {
//         rows[rowIndex].values[index] = calculo;
//       }
//     });
//     setTimeout(1000);
//     setRenderer(renderer + 1);
//   };
  

//   const handleMasPersonasClick = () => {
//     addNewRow();
//   };

//   return (
//     <div>
//       <div>
//         <div>
//           <div className="table-container">
//             <table className="cuotas-table scrollable-table">
//               <thead>
//                 <tr>
//                   <th>Número de Personas</th>
//                   <th>Total</th>
//                   {paymentDates.map((date, index) => (
//                     <th key={index}>{`Pago ${index + 1} (${date})`}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {paymentDates && rows.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     <td>
//                       <div className='td-personas'>
//                         <input
//                           type="text"
//                           step="0.01"
//                           value={previousTotalPersonas}
//                           onChange={(e) => setPreviousTotalPersonas(e.target.value)}
//                         />
//                         {" - "}
//                         <input
//                           type="text"
//                           step="0.01"
//                           value={row.persona}
//                           onChange={(e) => {
//                             const updatedRows = [...rows];
//                             updatedRows[rowIndex].persona = e.target.value;
//                             setRows(updatedRows);
//                           }}
//                         />
//                       </div>
//                     </td>
//                     <td>{row.importeTotal}</td>
//                     {row.values.map((cuota, index) => (
//                       <td key={index}>
//                         <input
//                           type="text"
//                           step="0.01"
//                           value={cuota}
//                           onChange={(e) =>
//                             handleCuotaChange(e.target.value, index, rowIndex)
//                           }
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <button className="btnDate" onClick={handleMasPersonasClick}>+ Añadir</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cuotas;
