import { Image, StyleSheet, Text, View, TextInput, Pressable, Modal, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImage, updateProfile } from '../NewsService';

const EditFrofile = (props) => {
  const { navigation } = props
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [imagePath, setImagePath] = useState(null)
  


  const takePhoto = useCallback(async (response) => {
    if (response.didCancel) return;
    if (response.errorCode) return;
    if (response.errorMessage) return;
    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      setImage(asset.uri);
      setModalVisible(false);
      // upload image
      const formData = new FormData();
      formData.append('image', {
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      });
      const data = await uploadImage(formData);
      setImagePath(data.path);
    }
  }, []);

  const openCamera = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchCamera(options, takePhoto);
  }, []);

  const openLibrary = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchImageLibrary(options, takePhoto);
  }, []);

  const save = useCallback(async () => {
    const data = {
      name,
      address,
      phone,
      avatar: imagePath,
      dob
    };
    const response = await updateProfile(data);
    console.log(data)
    console.log(response);
    // tự viết
    Alert.alert('Thêm thành công')
    navigation.navigate("Profile")
    setName('');
    setAddress('');
    setPhone('');
    setDob('');
    setImage(null);
    setImagePath(null);
  }, [name, address, phone, imagePath, dob]);

  return (
    <KeyboardAvoidingView style={styles.body}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => { navigation.navigate("Profile") }} >
            <Image source={require('../../../assets/images/icon_remove.png')} />
          </Pressable>
          <Text style={styles.text}>Edit Profile</Text>
          <Pressable onPress={save} >
            <Image source={require('../../../assets/images/icon_check.png')} />
          </Pressable>
        </View>
        <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center', }}>
          {
            image ?
              <Pressable style={styles.cover} onPress={() => setModalVisible(true)}>
                <Image source={{ uri: image }} style={{ width: '100%', height: "100%", borderRadius: 100 }} />
              </Pressable>
              :
              <Pressable style={styles.cover} onPress={() => setModalVisible(true)}>
              </Pressable>
          }
        </View>
        <View style={styles.userName}>
          <Text style={styles.text2}>Username</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input} />
        </View>
        <View style={styles.userName}>
          <Text style={styles.text2}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input} />
        </View>
        <View style={styles.userName}>
          <Text style={styles.text2}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input} />
        </View>
        <View style={styles.userName}>
          <Text style={styles.text2}>Day of birth</Text>
          <TextInput
            value={dob}
            onChangeText={setDob}
            style={styles.input} />
        </View>


        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text onPress={openCamera}>Chụp ảnh</Text>
              <Text onPress={openLibrary}>Chọn ảnh</Text>
              <Text onPress={() => setModalVisible(false)}>Cancel</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default EditFrofile

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: 140,
    height: 140,
    backgroundColor: '#EEF1F4',
    borderRadius: 100,
  },
  text2: {
    fontFamily: "Poppins-Medium",
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
    color: '#4E4B66',
  },
  input: {
    width: '100%',
    height: 48,
    padding: 10,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#4E4B66',
  },
  userName: {
    marginTop: 16,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  body: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF'
  }
})