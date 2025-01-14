import { RiCloseLine, RiErrorWarningLine, RiCheckLine } from 'react-icons/ri'

const variants = {
  warning: {
    container: 'bg-white border border-red-500',
    icon: <RiErrorWarningLine className="w-5 h-5 text-red-500" />,
    title: 'Warning',
    titleColor: 'text-red-500',
    primaryButton: 'bg-red-500 text-white hover:bg-red-600',
    secondaryButton: 'text-red-500 hover:text-red-600'
  },
  incomplete: {
    container: 'bg-white border border-yellow-500',
    icon: <RiErrorWarningLine className="w-5 h-5 text-yellow-500" />,
    title: 'Profile incomplete',
    titleColor: 'text-yellow-500',
    primaryButton: 'bg-yellow-500 text-white hover:bg-yellow-600',
    secondaryButton: 'text-yellow-500 hover:text-yellow-600'
  },
  success: {
    container: 'bg-white border border-green-500',
    icon: <RiCheckLine className="w-5 h-5 text-green-500" />,
    title: 'Success',
    titleColor: 'text-green-500',
    primaryButton: 'bg-green-500 text-white hover:bg-green-600',
    secondaryButton: 'text-green-500 hover:text-green-600'
  }
}

export default function Alert({ 
  type = 'warning', 
  message, 
  onClose, 
  onAction, 
  actionText,
  show = false 
}) {
  if (!show) return null
  
  const styles = variants[type]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>
        
        <div className={`
          relative transform overflow-hidden rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md
          ${styles.container}
        `}>
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {styles.icon}
              </div>
              <div className="ml-3 w-0 flex-1">
                <h3 className={`text-sm font-medium ${styles.titleColor}`}>
                  {styles.title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {message}
                  </p>
                </div>
              </div>
              {onClose && (
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <RiCloseLine className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              {onClose && (
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold ${styles.secondaryButton}`}
                  onClick={onClose}
                >
                  Cancel
                </button>
              )}
              {onAction && (
                <button
                  type="button"
                  className={`inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold ${styles.primaryButton}`}
                  onClick={onAction}
                >
                  {actionText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

