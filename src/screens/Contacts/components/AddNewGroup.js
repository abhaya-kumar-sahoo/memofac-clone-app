import { AppColors } from 'assets/AppColors';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Modal, Portal, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { CreateGroup } from 'redux/sagas/Contacts/api.request';
import { ModalButtons } from 'screens/Timeline/components/MenuOption';
import { showToast } from 'shared/Functions/ToastFunctions';
import { FontSize, GStyles, Spacing, VertSpace } from 'shared/Global.styles';

export const AddGroupModal = ({
  existingGroups = [],
  onDismiss = () => {},
  onGroupCreated = () => {},
  buttonComponent = null,
}) => {
  const userData = useSelector(state => state.userAuth);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [groupName, setGroupName] = React.useState('');
  const containerStyle = { padding: 20 };

  // ON CONFIRM
  const onConfirm = () => {
    if (groupName !== '') {
      const groupExists = existingGroups.filter(
        groupObj => groupObj.name == groupName,
      ).length;
      if (groupExists === 0) {
        hideModal();
        CreateGroup(userData.userToken, groupName)
          .then(response => {
            setGroupName('');
            onGroupCreated();
            showToast(`Group '${groupName}' created.`);
            onDismiss();
          })
          .catch(error => {
            onDismiss();
            showToast('Error while creating group');
          });
      } else showToast('Group already exists, please try different name');
    } else {
      showToast('please enter a group name');
    }
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View style={{ ...GStyles.ModalContainer, padding: 30 }}>
            <Text
              style={{
                ...GStyles.headerStyles,
                fontSize: FontSize.inputText,
                alignSelf: 'center',
              }}
            >
              Add New group
            </Text>
            <VertSpace size={Spacing.xlarge} />
            <TextInput
              placeholder={'Group Name'}
              style={styles.TextInputStyle}
              onChangeText={groupName => setGroupName(groupName)}
            />

            <VertSpace size={Spacing.large} />
            <View
              style={[GStyles.flexRow, { justifyContent: 'space-between' }]}
            >
              <Ripple
                onPress={() => {
                  hideModal();
                  onDismiss();
                }}
              >
                <Text style={GStyles.buttonStyle1}>Cancel</Text>
              </Ripple>
              <Ripple
                onPress={() => {
                  onConfirm();
                }}
              >
                <Text style={GStyles.buttonStyle1}>Ok</Text>
              </Ripple>
            </View>
          </View>
        </Modal>
      </Portal>

      <Pressable onPress={showModal}>{buttonComponent}</Pressable>
    </>
  );
};

export const AddGroupModalNew = ({
  existingGroups = [],
  onDismiss = () => {},
  onGroupCreated = () => {},
}) => {
  const userData = useSelector(state => state.userAuth);
  const [groupName, setGroupName] = React.useState('');
  const containerStyle = { padding: 20, paddingBottom: 0 };

  // ON CONFIRM
  const onConfirm = () => {
    if (groupName !== '') {
      const groupExists = existingGroups.filter(
        groupObj => groupObj.name == groupName,
      ).length;
      if (groupExists === 0) {
        CreateGroup(userData.userToken, groupName)
          .then(response => {
            setGroupName('');
            onGroupCreated();
            showToast(`Group '${groupName}' created.`);
          })
          .catch(error => {
            showToast('Error while creating group');
          })
          .finally(onDismiss);
      } else showToast('Group already exists, please try different name');
    } else {
      showToast('please enter a group name');
    }
  };

  return (
    <>
      <Portal>
        <Modal
          visible={true}
          onDismiss={onDismiss}
          contentContainerStyle={containerStyle}
        >
          <View style={{ ...GStyles.ModalContainer, padding: 30 }}>
            <Text style={styles.header}>Add New group</Text>
            <VertSpace size={Spacing.xlarge} />
            <TextInput
              placeholder={'Group Name'}
              style={styles.TextInputStyle}
              onChangeText={groupName => setGroupName(groupName)}
            />

            <VertSpace size={Spacing.large} />
            <View
              style={[GStyles.flexRow, { justifyContent: 'space-between' }]}
            >
              <ModalButtons
                title="Cancel"
                onPress={onDismiss}
                modalStyle={{ justifyContent: 'flex-start' }}
              />
              <ModalButtons
                title="ok"
                onPress={onConfirm}
                modalStyle={{ justifyContent: 'flex-end' }}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export const styles = StyleSheet.create({
  TextInputStyle: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: AppColors.MediumGrey,
    paddingHorizontal: Spacing.large,
    color: AppColors.disableColor,
  },
  header: {
    ...GStyles.headerStyles,
    fontSize: FontSize.inputText,
    alignSelf: 'center',
  },
});
