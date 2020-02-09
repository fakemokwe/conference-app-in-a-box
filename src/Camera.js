import * as React from 'react';
import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Auth, I18n } from 'aws-amplify'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    countOfFiles: 0,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    this.checkForFolder();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };
  
  checkForFolder = async () => {
    const metaDataDir = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'contacts/');
    const isDir = metaDataDir.isDirectory;
    if (!isDir) {
        try {
            await FileSystem.makeDirectoryAsync(
                FileSystem.documentDirectory + 'contacts/',
            );
        } catch (e) {
            console.info("ERROR", e);
        }
    } else {
      const countF = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'contacts/').length;
      this.setState({ countOfFiles: countOfFiles + countF});
    }
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>{I18n.get('Requesting for camera permission')}</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>{I18n.get('No access to camera')}</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        
        <View style={styles.bottomBar}>
          
          {/* Show if scanned */}
          {scanned && (<Button color="#2E728F" title={I18n.get('Tap to Scan Again')} onPress={() => this.setState({ scanned: false })} />)}
          
          {/* Show if not scanned */}
          {!scanned && (
            <Text style ={styles.label}>
              {I18n.get('Hold steady over the QRcode.')}
            </Text>
          )}
          
        </View>

      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    if (data.slice(0,11) === 'BEGIN:VCARD') {
      this.setState({ scanned: true });
      const indexC  =  this.state.countOfFiles + 1;
      try{
        const result = FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'contacts/' + 'contact_' + indexC + '.vcf', data);
        if(Platform.OS == 'android'){
           const result2 = IntentLauncher.startActivityAsync(
            'android.content.Intent.ACTION_VIEW',
             //'android.intent.action.VIEW', 
              {
                type: 'text/vcard',
                data : FileSystem.documentDirectory + 'contacts/' + 'contact_' + indexC + '.vcf'}
              )
          }       
      } catch (e) {
        console.info("ERROR in file share or save", e);
      }
      
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#2E728F',
    padding: 8,
  },
});