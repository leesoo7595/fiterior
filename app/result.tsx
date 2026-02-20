import { useMemo, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { THEMES } from '../constants/themes'
import { MODELS } from '../constants/models'

type ViewMode = 'compare' | 'before' | 'after'

export default function ResultScreen() {
  const { resultUrl, imageUri, themeId, modelId } = useLocalSearchParams<{
    resultUrl?: string
    imageUri?: string
    themeId?: string
    modelId?: string
  }>()
  const router = useRouter()

  const selectedTheme = useMemo(() => THEMES.find((t) => t.id === themeId), [themeId])
  const selectedModel = useMemo(() => MODELS.find((m) => m.id === modelId), [modelId])

  const [viewMode, setViewMode] = useState<ViewMode>('compare')

  const handleRetry = () => {
    router.replace('/')
  }

  const hasComparison = !!imageUri && !!resultUrl

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Ionicons name="checkmark-circle" size={32} color="#22C55E" />
          <View>
            <Text style={styles.title}>변환이 완료되었어요</Text>
            <Text style={styles.subtitle}>새로운 인테리어 결과를 확인하세요</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>결과 이미지</Text>

          {hasComparison && (
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tab, viewMode === 'compare' && styles.tabActive]}
                onPress={() => setViewMode('compare')}
              >
                <Text style={[styles.tabText, viewMode === 'compare' && styles.tabTextActive]}>
                  비교
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, viewMode === 'before' && styles.tabActive]}
                onPress={() => setViewMode('before')}
              >
                <Text style={[styles.tabText, viewMode === 'before' && styles.tabTextActive]}>
                  원본
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, viewMode === 'after' && styles.tabActive]}
                onPress={() => setViewMode('after')}
              >
                <Text style={[styles.tabText, viewMode === 'after' && styles.tabTextActive]}>
                  변환
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {hasComparison && viewMode === 'compare' ? (
            <View style={styles.compareContainer}>
              <View style={styles.compareHalf}>
                <Image source={{ uri: imageUri }} style={styles.compareImage} resizeMode="cover" />
                <View style={styles.labelBefore}>
                  <Text style={styles.labelText}>Before</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.compareHalf}>
                <Image source={{ uri: resultUrl }} style={styles.compareImage} resizeMode="cover" />
                <View style={styles.labelAfter}>
                  <Text style={styles.labelText}>After</Text>
                </View>
              </View>
            </View>
          ) : resultUrl ? (
            <Image
              source={{ uri: viewMode === 'before' ? imageUri : resultUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="image-outline" size={32} color="#9CA3AF" />
              <Text style={styles.placeholderText}>변환된 이미지가 곧 표시됩니다</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>선택한 설정</Text>
          <View style={styles.metaRow}>
            <Ionicons name="color-palette-outline" size={18} color="#6B7280" />
            <Text style={styles.metaText}>{selectedTheme ? selectedTheme.name : '미지정'} 테마</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="sparkles-outline" size={18} color="#6B7280" />
            <Text style={styles.metaText}>{selectedModel ? selectedModel.name : '모델 미지정'}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleRetry}>
            <Text style={styles.primaryText}>다시 해보기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  tabTextActive: {
    color: '#0F172A',
  },
  image: {
    marginTop: 4,
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  compareContainer: {
    marginTop: 4,
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    aspectRatio: 8 / 3,
  },
  compareHalf: {
    flex: 1,
  },
  compareImage: {
    width: '100%',
    height: '100%',
  },
  divider: {
    width: 2,
    backgroundColor: '#fff',
  },
  labelBefore: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  labelAfter: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    marginTop: 8,
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  placeholderText: {
    color: '#94A3B8',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#1F2937',
  },
  actions: {
    marginTop: 4,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
})
