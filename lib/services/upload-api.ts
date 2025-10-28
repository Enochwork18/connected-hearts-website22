// Mock Upload API with progress tracking
// Simulates file uploads with progress callbacks

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface UploadResult {
  url: string
  filename: string
  size: number
  type: string
}

// Simulate file upload with progress
export async function uploadFile(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  const totalSize = file.size
  let loaded = 0

  // Simulate upload progress
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      loaded += totalSize / 20 // Simulate 20 steps
      const percentage = Math.min(Math.round((loaded / totalSize) * 100), 100)

      if (onProgress) {
        onProgress({
          loaded: Math.min(loaded, totalSize),
          total: totalSize,
          percentage,
        })
      }

      if (percentage >= 100) {
        clearInterval(interval)

        // Generate a stable mock URL based on file name
        const mockUrl = `https://storage.connectedhearts.com/uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`

        resolve({
          url: mockUrl,
          filename: file.name,
          size: file.size,
          type: file.type,
        })
      }
    }, 100) // Update every 100ms
  })
}

// Upload multiple files
export async function uploadFiles(
  files: File[],
  onProgress?: (fileIndex: number, progress: UploadProgress) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = []

  for (let i = 0; i < files.length; i++) {
    const result = await uploadFile(files[i], (progress) => {
      if (onProgress) {
        onProgress(i, progress)
      }
    })
    results.push(result)
  }

  return results
}

// Validate image file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Please upload a valid image file (JPEG, PNG, WebP, or GIF)",
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "File size must be less than 5MB",
    }
  }

  return { valid: true }
}

// Preview image file
export function getImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    reader.readAsDataURL(file)
  })
}
