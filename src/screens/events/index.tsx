import Layout from '@/components/layout';
import ComingSoon from '@/components/widgets/coming-soon';
import React from 'react';

function EventScreen({navigation}: {navigation: any}) {
  const loadData = async () => {};
  return (
    <Layout appbar bottomBar navigation={navigation} refresh={loadData}>
      <ComingSoon />
    </Layout>
  );
}

export default EventScreen;
