import {
  StyleSheet, Text, View, Pressable,
  Image, TextInput, Modal, Alert, KeyboardAvoidingView, ScrollView
} from 'react-native'
import React, { useState, useCallback } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadImage, addNews } from '../NewsService';

// hooks tiểu học: useState, useEffect, useContext
// hooks trung học: useCallback, useMemo, useRef, memo

const Add = (props) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePath, setImagePath] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const { navigation } = props;

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
      title,
      content,
      image: imagePath,
    };
    const response = await addNews(data);
    console.log(response);
    // tự viết
    Alert.alert('Thêm thành công')
    setTitle('');
    setContent('');
    setImage(null);
    setImagePath(null);
  }, [title, content, imagePath]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: 700 }} >
        <Text style={styles.title}>Create News</Text>
        {
          image ?
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.cover}>
              <Image source={{ uri: image }}
                style={{ width: '100%', height: 183, borderRadius: 6 }} />
            </Pressable>
            :
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.cover}>
              <Text>+</Text>
              <Text>Add Cover Photo</Text>
            </Pressable>
        }
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#C4C4C4', paddingBottom: 0, }}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="News title"
            style={styles.textInput1}
          />
        </View>
        <TextInput
          value={content}
          onChangeText={setContent}
          placeholder="Add News/Article"
          multiline={true}
          numberOfLines={3}
          style={styles.textInput2}
        />
        <Pressable style={styles.btn} onPress={save}>
          <Text style={styles.btnLabel}>Publish</Text>
        </Pressable>
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

export default Add

const styles = StyleSheet.create({
  btnLabel: {
    fontFamily: "Poppins-Medium",
    fontStyle: 'normal',
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#FFFFFF',
  },
  btn: {
    marginTop: 13,
    marginBottom: 13,
    width: '30%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: "70%",
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#1877F2',
    borderRadius: 6,
  },
  textInput2: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: '#4E4B66',
  },
  textInput1: {
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 36,
    color: '#050505',
    marginTop: 16,
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 183,
    backgroundColor: '#EEF1F4',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '4E4B66',
    borderRadius: 6,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginBottom: 16,
    marginTop: 24
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
  }
})
