import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import React from 'react';
import { AppColors } from 'assets/AppColors';
import { GStyles } from 'shared/Global.styles';
import { Container } from 'components/Mini';
import { AppHeader } from 'components/AppHeader';
import { useSelector } from 'react-redux';

export const ViewPhoto = ({ route }) => {
  const { image } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={GStyles.Dark}>
        <AppHeader enableBack />
        {/* <Text>ViewPhoto</Text> */}
        <View
          style={{
            ...GStyles.flexRowCenter,
          }}
        />
        <Image
          source={{ uri: image }}
          width="100%"
          height="100%"
          style={{ width: '100%', height: '100%' }}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
