import React from 'react';
import { CardType } from '../../types';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import Styles from '../../styles';
import CustomButton from '../button';
import { Colors } from '../../../constant/color';
import { Dimensions, View } from 'react-native';
import { scaledFontSize } from '@/components/functions';
const baseHeight = 800; // Height on which the font size is designed
const { width, height } = Dimensions.get('window')

function CustomCard({
  title,
  subtitle,
  children,
  action,
  loading,
  additional_action,
  style,
}: CardType) {

  return (
    <View style={{}}>

      <Card style={[Styles.card, { ...style }]}>
        <Card.Content style={[Styles.cardContent]}>
          {title ?
            <View><Text style={[Styles.cardTitle, {
              fontSize: scaledFontSize(22),
              textTransform: 'uppercase',
              marginVertical: 10
            }]}>{title}</Text></View>
            : null}
          {children}
        </Card.Content>
        {action || (additional_action && additional_action?.length > 0) ?
          <Card.Actions>
            <View style={{ ...Styles.flexColumn, }}>
              <View style={[Styles.flex]}>
                {action ? (
                  <CustomButton
                    style={[Styles.submit, action.style]}
                    loading={loading}
                    title={action.title}
                    type={action.type}
                    action={action.action}
                    color={action.color}
                  />
                ) : null}
              </View>
              <View style={Styles.flex}>
                {additional_action?.map((item, key) => {
                  return (
                    <View key={key} style={Styles.flex}>
                      <Text style={[Styles.subtitle, { fontSize: scaledFontSize(15) }]}>{item.subtitle}</Text>
                      <CustomButton
                        style={[item.style,]}
                        loading={loading}
                        title={item.title}
                        type={item.type}
                        action={item.action}
                        color={item.color}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </Card.Actions>
          : null}
      </Card>
    </View >
  );
}

export default CustomCard;
