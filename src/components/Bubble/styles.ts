import styled from 'styled-components/native'
import {View} from 'react-native';

type ActiveIndex = {
    active: boolean;
  };
  export const ActiveIndex = styled(View)<ActiveIndex>`
    height: 6px;
    width: 6px;
    margin-left: 8px;
    border-radius: 3px;
  
    background-color: ${({ theme, active }) =>
      active ? theme.colors.title : theme.colors.text_detail};
  `;