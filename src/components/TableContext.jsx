import { createContext, useContext } from 'react';

export const TableContext = createContext();

export const useTable = () => useContext(TableContext);