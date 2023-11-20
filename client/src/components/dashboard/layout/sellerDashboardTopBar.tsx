interface SellerDashboardTopBarProps {
  mode: 'action' | 'message'
  message: string
  buttonLabel?: string
  onClick?: () => void
}

export default function SellerDashboardTopBar({ mode, message, buttonLabel, onClick }: SellerDashboardTopBarProps) {
  return (
    <div className='padding-x-dashboard-estilo1 py-8 dark:text-white'>
      {mode === 'action' && (
        <div className='flex items-center gap-4'>
          <h3 className='text-titulo3-medium'>{message}</h3>
          <button
            className='background-primary-red-700 dark:bg-red-900 color-neutral-white rounded-full px-5 py-3 text-sm font-semibold'
            onClick={onClick}
          >
            {buttonLabel}
          </button>
        </div>
      )}
      {mode === 'message' && (
        <div>
          <h3 className='text-titulo3-medium'>{message}</h3>
        </div>
      )}
    </div>
  )
}
