import { useCallback, useEffect, useMemo, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { THEMES } from '../constants/themes'
import { MODELS } from '../constants/models'
import { LOADING_STEPS } from '../constants/loading'
import { useTransformJob } from '../hooks/useTransformJob'

export default function LoadingScreen() {
  const { imageUri, themeId, modelId } = useLocalSearchParams<{
    imageUri: string
    themeId: string
    modelId: string
  }>()
  const router = useRouter()
  const pulse = useRef(new Animated.Value(0)).current

  const selectedTheme = useMemo(() => THEMES.find((t) => t.id === themeId), [themeId])
  const selectedModel = useMemo(() => MODELS.find((m) => m.id === modelId), [modelId])

  const handleComplete = useCallback(
    (data: { jobId: string; resultUrl: string }) =>
      router.replace({
        pathname: '/result',
        params: {
          jobId: data.jobId,
          resultUrl: data.resultUrl,
          imageUri,
          themeId,
          modelId,
        },
      }),
    [router, imageUri, themeId, modelId],
  )

  const { stepIndex, error, retry } = useTransformJob({
    imageUri,
    themeId,
    modelId,
    onComplete: handleComplete,
  })

  useEffect(() => {
    // subtle pulse animation for the icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [pulse])

  const renderSteps = () =>
    LOADING_STEPS.map((step, idx) => {
      const isActive = idx === stepIndex
      const isDone = idx < stepIndex
      return (
        <View key={step.key} style={styles.stepRow}>
          <View
            style={[
              styles.stepDot,
              isDone && styles.stepDotDone,
              isActive && styles.stepDotActive,
            ]}
          />
          <Text style={[styles.stepText, isActive && styles.stepTextActive]}>{step.label}</Text>
        </View>
      )
    })

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI 변환 중</Text>
        <Text style={styles.caption}>선택한 이미지와 설정으로 인테리어를 재구성하고 있어요</Text>
      </View>

      <View style={styles.hero}>
        <Animated.View style={[styles.iconCircle, { transform: [{ scale }] }]}>
          <Ionicons name="sparkles-outline" size={42} color="#fff" />
        </Animated.View>
        <Text style={styles.heroText}>조금만 기다려주세요</Text>
      </View>

      <View style={styles.panel}>{renderSteps()}</View>

      <View style={styles.meta}>
        {selectedTheme && (
          <View style={styles.metaChip}>
            <View style={[styles.metaDot, { backgroundColor: selectedTheme.color }]} />
            <Text style={styles.metaText}>{selectedTheme.name} 테마</Text>
          </View>
        )}
        {selectedModel && (
          <View style={styles.metaChip}>
            <Ionicons name={selectedModel.icon as keyof typeof Ionicons.glyphMap} size={14} color="#555" />
            <Text style={styles.metaText}>{selectedModel.name}</Text>
          </View>
        )}
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={retry}>
            <Text style={styles.retryText}>다시 시도하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  caption: {
    fontSize: 14,
    color: '#A5B1CC',
  },
  hero: {
    alignItems: 'center',
    marginVertical: 32,
    gap: 10,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  heroText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  panel: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1F2937',
  },
  stepDotActive: {
    backgroundColor: '#60A5FA',
  },
  stepDotDone: {
    backgroundColor: '#22C55E',
  },
  stepText: {
    color: '#CBD5E1',
    fontSize: 14,
  },
  stepTextActive: {
    color: '#E5E7EB',
    fontWeight: '700',
  },
  meta: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  metaDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  metaText: {
    color: '#E5E7EB',
    fontSize: 13,
    fontWeight: '600',
  },
  errorBox: {
    marginTop: 20,
    backgroundColor: 'rgba(248,113,113,0.12)',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(248,113,113,0.4)',
    gap: 10,
  },
  errorText: {
    color: '#FCA5A5',
    fontWeight: '700',
  },
  retryButton: {
    backgroundColor: '#F87171',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
})
