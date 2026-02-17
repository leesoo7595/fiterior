import { useCallback, useEffect, useState } from 'react'
import { LOADING_STEPS, STATUS_INTERVAL_MS } from '../constants/loading'
import { requestTransform, TransformRequest, TransformResponse } from '../services/transform'

type Params = TransformRequest & {
  onComplete: (result: TransformResponse) => void
}

export function useTransformJob({ onComplete, ...payload }: Params) {
  const [stepIndex, setStepIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    let timers: Array<ReturnType<typeof setTimeout>> = []

    const advanceSteps = () => {
      for (let i = 1; i < LOADING_STEPS.length; i += 1) {
        const timer = setTimeout(() => {
          if (!cancelled) setStepIndex(i)
        }, i * STATUS_INTERVAL_MS)
        timers.push(timer)
      }
    }

    const run = async () => {
      setStepIndex(0)
      setError(null)
      advanceSteps()

      try {
        const result = await requestTransform(payload)
        if (cancelled) return
        setStepIndex(LOADING_STEPS.length - 1)
        setTimeout(() => {
          if (!cancelled) onComplete(result)
        }, 600)
      } catch (e) {
        if (!cancelled) setError('변환 중 문제가 발생했어요. 다시 시도해주세요.')
      }
    }

    run()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [attempt, onComplete, payload.imageUri, payload.modelId, payload.themeId])

  const retry = useCallback(() => {
    setAttempt((prev) => prev + 1)
  }, [])

  return { stepIndex, error, retry }
}
