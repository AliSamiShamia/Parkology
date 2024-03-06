import Layout from '@/components/layout';
import {ProductKnowledgeType} from '@/components/types';
import FullScreenVideo from '@/components/widgets/video';
import React from 'react';
import {Dimensions, View} from 'react-native';

const {height} = Dimensions.get('screen');

function VideoScreen({route, navigation}: {route: any; navigation: any}) {
  const {item} = route.params;

  return (
    <Layout
      fixed
      removeSpace
      rotate={true}
      appbar={false}
      bottomBar={false}
      navigation={navigation}>
      <View style={{height: height, width: '100%', position: 'relative'}}>
        <FullScreenVideo
          item={item as ProductKnowledgeType}
        />
      </View>
    </Layout>
  );
}

export default VideoScreen;
