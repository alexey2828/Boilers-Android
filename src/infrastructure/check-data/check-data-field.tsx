/* eslint-disable react/react-in-jsx-scope */
import { Text } from 'react-native';
import { IndexStyle } from '../../components/pages/page-styles/index.style';

export function checkData(dataField: number | undefined): string {
  return dataField != null && !isNaN(dataField)
    ? dataField.toFixed(2)
    : '0.00'; // Если значение не передано или NaN, возвращаем "0.00"
}
