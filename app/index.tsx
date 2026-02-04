import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

export default function HomeScreen() {
  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('권한 필요', '카메라 사용을 위해 권한이 필요합니다.')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri
      // TODO: 다음 화면으로 이동
      console.log('선택된 이미지:', imageUri)
    }
  }

  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('권한 필요', '갤러리 접근을 위해 권한이 필요합니다.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri
      // TODO: 다음 화면으로 이동
      console.log('선택된 이미지:', imageUri)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Fiterior</Text>
        <Text style={styles.subtitle}>AI로 인테리어를 상상해보세요</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCamera}>
            <Ionicons name="camera-outline" size={40} color="#333" />
            <Text style={styles.buttonText}>사진 촬영</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleGallery}>
            <Ionicons name="image-outline" size={40} color="#333" />
            <Text style={styles.buttonText}>갤러리에서 선택</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    width: 140,
    height: 140,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
})
