import React from 'react';
import { Button, Modal, Text, View } from 'react-native';

import { translate } from 'localization/hooks';

import { isUpdated, openStore } from 'network/services/force-update';

import { styles } from './force-update-modal.styles';

interface ForceUpdateProps {}

const ForceUpdateModal = ({}: ForceUpdateProps) => (
  <Modal animationType="slide" transparent={true} visible={isUpdated()}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{translate('alert.update')}</Text>
        <Button title={translate('buttons.ok')} onPress={openStore} />
      </View>
    </View>
  </Modal>
);

export { ForceUpdateModal };
