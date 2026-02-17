export type TransformRequest = {
  imageUri?: string
  themeId?: string
  modelId?: string
}

export type TransformResponse = {
  jobId: string
  resultUrl: string
}

// TODO: 실제 백엔드 엔드포인트로 교체해주세요.
export async function requestTransform(payload: TransformRequest): Promise<TransformResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch('https://example.com/api/transform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).catch(() => null)

    clearTimeout(timeout)

    if (response?.ok) {
      return (await response.json()) as TransformResponse
    }
  } finally {
    clearTimeout(timeout)
  }

  // 연결되지 않았을 때의 임시 응답
  return new Promise<TransformResponse>((resolve) =>
    setTimeout(
      () =>
        resolve({
          jobId: `job-${Date.now()}`,
          resultUrl: payload.imageUri ?? '',
        }),
      1600,
    ),
  )
}
