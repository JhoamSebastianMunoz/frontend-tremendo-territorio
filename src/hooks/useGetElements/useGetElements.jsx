import { useContext } from 'react';
import { GetContext } from '../../contexts/GetElements/GetElements';

export const useGetElements = () => {
  const context = useContext(GetContext);
  if (!context) {
    throw new Error('useGetElements debe usarse dentro de un GetElementsProvider');
  }
  return context;
};

