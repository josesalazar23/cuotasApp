import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPersonas: '',
    totalImporte: '',
    totalPorcentaje: 30,
    selectedMonth: '01',
    selectedYear: new Date().getFullYear().toString(),
    showTable: false,
    mostrarInicio: true,
    error: "",
    selectedDay: '01',
    editIndex: -1,
    cuotasStates: [],
    porcentajeReduccion: 0,
  };

export const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
      setTotalPersonas: (state, action) => {
        state.totalPersonas = action.payload;
      },
      setTotalImporte: (state, action) => {
        state.totalImporte = action.payload;
      },
      setTotalPorcentaje: (state, action) => {
        state.totalPorcentaje = action.payload;
      },
      setSelectedMonth: (state, action) => {
        state.selectedMonth = action.payload;
      },
      setSelectedYear: (state, action) => {
        state.selectedYear = action.payload;
      },
      setShowTable: (state, action) => {
        state.showTable = action.payload;
      },
      setMostrarInicio: (state, action) => {
        state.mostrarInicio = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
      setSelectedDay: (state, action) => {
        state.selectedDay = action.payload;
      },
      setEditIndex: (state, action) => {
        state.editIndex = action.payload;
      },
      setCuotasStates: (state, action) => {
        state.cuotasStates = action.payload;
      },
      setPorcentajeReduccion: (state, action) => {
        state.porcentajeReduccion = action.payload;
      },
    },
  });

  export const {
    setTotalPersonas,
    setTotalImporte,
    setTotalPorcentaje,
    setSelectedMonth,
    setSelectedYear,
    setShowTable,
    setMostrarInicio,
    setError,
    setSelectedDay,
    setEditIndex,
    setCuotasStates,
    setPorcentajeReduccion,
  } = paymentsSlice.actions;



export default paymentsSlice.reducer;