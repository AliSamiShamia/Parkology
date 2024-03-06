import Styles from '@/components/styles';
import {SnackbarType} from '@/components/types';
import {Colors} from '@/constant/color';
import React from 'react';
import {Snackbar, Text} from 'react-native-paper';

function CustomSnackbar({visible, onDismiss, title}: SnackbarType) {
  return (
    <Snackbar
      style={{backgroundColor: Colors.error}}
      visible={visible ?? false}
      onDismiss={onDismiss ? onDismiss : () => {}}>
      <Text style={Styles.text}> {title}</Text>
    </Snackbar>
  );
}

export default CustomSnackbar;
