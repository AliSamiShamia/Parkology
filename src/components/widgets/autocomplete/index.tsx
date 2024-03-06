import {AutoCompleteType} from '@/components/types';
import {Colors} from '@/constant/color';
import {get} from '@/data/api.handler';
import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Styles from '@/components/styles';
import {Dropdown} from 'react-native-element-dropdown';

interface PickerItem {
  label: string;
  value: string | number;
  [key: string]: any; // Allow for additional custom properties
}

function AutoComplete({url, value, title, handleChange}: AutoCompleteType) {
  const [suggestionsList, setSuggestionsList] = useState<PickerItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getListOfItems = async () => {
    setLoading(true);
    const res = await get(url, null);
    if (res && res.status_code == 200) {
      const items = res.data;
      setSuggestionsList(items);
    } else {
      setSuggestionsList([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getListOfItems();
  }, [url]);
  return (
    <View
      style={[
        {borderWidth: 1, borderColor: Colors.placeholder, borderRadius: 5},
      ]}>
      {loading ? (
        <ActivityIndicator size={20} color={Colors.secondary} />
      ) : (
        <Dropdown
          style={[Styles.field]}
          data={suggestionsList}
          itemTextStyle={[{color:Colors.dark,textAlign:'center'}]}
          selectedTextStyle={[
            {paddingHorizontal: 16, color: Colors.placeholder},
          ]}
          placeholderStyle={[
            {paddingHorizontal: 16, color: Colors.placeholder},
          ]}
          search
          maxHeight={300}
          labelField="title"
          valueField="id"
          placeholder={'Select ' + title}
          searchPlaceholder="Search..."
          value={value}
          onChange={(item: any) => {
            handleChange(title, item);
          }}
        />
      )}
    </View>
  );
}

export default AutoComplete;
