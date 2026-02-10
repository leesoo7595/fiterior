import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { THEMES } from '../constants/themes'
import { Theme } from '../types/theme'

const SCREEN_WIDTH = Dimensions.get('window').width
const CARD_GAP = 12
const CARD_HORIZONTAL_PADDING = 20
const CARD_WIDTH = (SCREEN_WIDTH - CARD_HORIZONTAL_PADDING * 2 - CARD_GAP) / 2

export default function PromptScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>()
  const router = useRouter()
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)

  const handleThemePress = (theme: Theme) => {
    setSelectedTheme(theme)
  }

  const handleConfirm = () => {
    if (!selectedTheme) return
    // TODO: 다음 화면(AI 변환)으로 이동
    console.log('변환 시작:', { imageUri, theme: selectedTheme.id })
  }

  const renderThemeCard = ({ item }: { item: Theme }) => {
    const isSelected = selectedTheme?.id === item.id

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => handleThemePress(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.cardImage, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={32} color="#fff" />
        </View>
        <Text style={[styles.cardName, isSelected && styles.cardNameSelected]}>{item.name}</Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark-circle" size={22} color="#333" />
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>스타일 선택</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.previewArea}>
        {selectedTheme ? (
          <View style={[styles.previewContent, { backgroundColor: selectedTheme.color }]}>
            <Ionicons
              name={selectedTheme.icon as keyof typeof Ionicons.glyphMap}
              size={64}
              color="#fff"
            />
            <Text style={styles.previewName}>{selectedTheme.name}</Text>
            <Text style={styles.previewDescription}>{selectedTheme.description}</Text>
          </View>
        ) : (
          <View style={styles.previewPlaceholder}>
            <Ionicons name="image-outline" size={48} color="#CCC" />
            <Text style={styles.previewPlaceholderText}>테마를 선택해주세요</Text>
          </View>
        )}
      </View>

      <FlatList
        data={THEMES}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        renderItem={renderThemeCard}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.confirmButton, !selectedTheme && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={!selectedTheme}
        >
          <Text style={[styles.confirmText, !selectedTheme && styles.confirmTextDisabled]}>
            변환하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
  previewArea: {
    marginHorizontal: 20,
    marginBottom: 20,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  previewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  previewName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  previewDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  previewPlaceholder: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  previewPlaceholderText: {
    fontSize: 14,
    color: '#999',
  },
  grid: {
    paddingHorizontal: CARD_HORIZONTAL_PADDING,
  },
  gridRow: {
    gap: CARD_GAP,
    marginBottom: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#333',
  },
  cardImage: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    paddingVertical: 10,
  },
  cardNameSelected: {
    fontWeight: 'bold',
  },
  checkmark: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  confirmButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#CCC',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  confirmTextDisabled: {
    color: '#fff',
  },
})
