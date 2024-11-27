import { toast } from 'react-toastify'

export const useToast = () => {
  const toastMethods = {
    success: (message: string) => {
      toast.success(message)
    },
    error: (message: string) => {
      toast.error(message)
    },
    warning: (message: string) => {
      toast.warn(message)
    },
    info: (message: string) => {
      toast.info(message)
    },
  }

  return toastMethods
}
