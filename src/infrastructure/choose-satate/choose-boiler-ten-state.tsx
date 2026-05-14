/* eslint-disable react/react-in-jsx-scope */
import {Text} from 'react-native';
import {IndexStyle} from '../../components/pages/page-styles/index.style';
import {states} from '../../const/states';
import {statesBoilerUa} from '../../const/states/boilers/states-ua';
import {createBinaryString} from '../create-binary-string/create-sinary-string';
import {chooseState} from './choose-state';

export function chooseStateForBoiler(dataField: number) {
  return (
    <>
      {chooseState(createBinaryString(dataField), states.sOn) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.sOn}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.sEnWork) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.sEnWork}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.mdRep) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.mdRep}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.mdAM) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.mdAM}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.uOn) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.uOn}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.ErrOn) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.ErrOn}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.ErrOff) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.ErrOff}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.ErrUnOn) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.ErrUnOn}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.Error) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.Error}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.bOn) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.bOn}</Text>
      ) : null}
      {chooseState(createBinaryString(dataField), states.bOff) ? (
        <Text style={IndexStyle.BottomTitle}> {statesBoilerUa.bOff}</Text>
      ) : null}
    </>
  );
}
