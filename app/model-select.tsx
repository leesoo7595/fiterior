import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { MODELS } from '../constants/models'
import { Model } from '../types/model'
import { THEMES } from '../constants/themes'

export default function ModelSelectScreen() {
  const { imageUri, themeId } = useLocalSearchParams<{ imageUri: string; themeId: string }>()
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const selectedTheme = THEMES.find((theme) => theme.id === themeId)

  const handleModelPress = (model: Model) => {
    setSelectedModel(model)
  }

  const handleStart = () => {
    if (!selectedModel) return
    router.push({
      pathname: '/loading',
      params: {
        imageUri,
        themeId,
        modelId: selectedModel.id,
      },
    })
  }

  const renderModelCard = ({ item }: { item: Model }) => {
    const isSelected = selectedModel?.id === item.id

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => handleModelPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={24} color="#fff" />
          </View>
          <View style={styles.cardTitleArea}>
            <Text style={styles.cardName}>{item.name}</Text>
          </View>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={22} color="#333" />
          )}
        </View>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#888" />
            <Text style={styles.metaText}>{item.estimatedTime}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="pricetag-outline" size={14} color="#888" />
            <Text style={styles.metaText}>{item.cost}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI 모델 선택</Text>
        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.subtitle}>
        {selectedTheme
          ? `${selectedTheme.name} 테마에 사용할 AI 모델을 선택해주세요`
          : '변환에 사용할 AI 모델을 선택해주세요'}
      </Text>

      <FlatList
        data={MODELS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderModelCard}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.startButton, !selectedModel && styles.startButtonDisabled]}
          onPress={handleStart}
          disabled={!selectedModel}
        >
          <Text style={[styles.startText, !selectedModel && styles.startTextDisabled]}>
            변환 시작
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
  subtitle: {
    fontSize: 14,
    color: '#888',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 12,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#333',
    backgroundColor: '#FAFAFA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleArea: {
    flex: 1,
    marginLeft: 12,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  startButton: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#CCC',
  },
  startText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  startTextDisabled: {
    color: '#fff',
  },
})
