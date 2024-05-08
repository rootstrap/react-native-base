import React from 'react';
import { Button, Modal, Text, View } from 'react-native';

import { useValidateAppVersion } from 'hooks/force-update';

import { translate } from 'localization/hooks';

import { styles } from './force-update-modal.styles';

interface ForceUpdateProps {}

const ForceUpdateModal = ({}: ForceUpdateProps) => {
  const { showModal, openStore } = useValidateAppVersion();

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{translate('alert.update')}</Text>
          <Button title={translate('buttons.ok')} onPress={openStore} />
        </View>
      </View>
    </Modal>
  );
};

export { ForceUpdateModal };
