import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import { Pressable, Text, View, SafeAreaView } from 'react-native';
import { AppColors } from '../../../assets/AppColors';

export const TimelinModal = props => {
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    setVisible(props.value);
  }, [props.value]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: AppColors.white,
          padding: 16,
          margin: 16,
          alignItems: 'center',
          borderRadius: 10,
        }}
      >
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 10 }} />
          <Pressable style={{ padding: 10 }} onPress={hideModal}>
            <Text style={{ color: AppColors.LowDark }}>Hello</Text>
          </Pressable>
        </View>

        {/* <VerifyEmail width={200} /> */}
        <View style={{ height: 20 }} />
        <Text style={{ fontSize: 20 }}>Verify email</Text>
        <Text style={{ fontSize: 14, textAlign: 'center' }}>
          Your email verification is pending.
        </Text>
        <View style={{ height: 20 }} />
      </Modal>
    </Portal>
  );
};
