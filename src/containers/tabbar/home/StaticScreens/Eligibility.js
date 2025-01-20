import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../../HeaderFooter/Header';
import Footer from '../../../HeaderFooter/Footer';
import { colors } from '../../../../themes';
import CustomLoader from '../customLoader';
export default function Eligibility() {
  const [visible, setVisible] = useState(true);
  const route = useRoute();
  let webLink = route.params.link;
  console.log('weblink--', webLink);
  const hideSpinner = async () => {
    setVisible(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        load={() => hideSpinner()}
        clearData={() => { }}
        onPressMenu={() => { }}
        webLink={route.params.link}
      />
      {
        visible && (
          <CustomLoader />
        )
      }
      <View
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: 1000,
          bottom: -4,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 10,
          elevation: 5,
        }}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
