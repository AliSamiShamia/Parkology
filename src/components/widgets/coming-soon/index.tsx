import { scaledFontSize } from '@/components/functions';
import Styles from '@/components/styles';
import { Colors } from '@/constant/color';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { Text } from 'react-native-paper';

function ComingSoon() {
  return (
    <View
      style={[Styles.flex, { height: Dimensions.get('screen').height * 0.7 }]}>
      <View
        style={[
          Styles.card,
          { backgroundColor: Colors.white, borderRadius: 10, padding: 10 },
        ]}>
        <View style={[Styles.cardContent, { padding: 10 }]}>
          <View style={[Styles.center, { gap: 10 }]}>
            <Text style={[Styles.darkBoldText, { fontSize: scaledFontSize(20), textAlign: 'center', color: Colors.secondary }]}>
              This section will be available soon.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ComingSoon;
