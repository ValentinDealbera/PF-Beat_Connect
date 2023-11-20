import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setCurrentPage } from '@/redux/slices/beats'

export default function PaginateBeats() {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const { pages } = useAppSelector((state) => state.beats) as any

  const visiblePages = []
  for (let i = pages.current - 2; i <= pages.current + 2; i++) {
    if (i > 0 && i <= pages.limit) {
      visiblePages.push(i)
    }
  }

  return (
    <div className='mt-4 flex justify-center gap-4'>
      <button
        onClick={() => dispatch(setCurrentPage(pages.current - 1))}
        disabled={pages.current === 1}
        className={pages.current === 1 ? 'text-black' : ' text-red-800'}
      >
        {t('beatShopSection.t1')}
      </button>
      <div className='flex justify-center gap-4'>
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => dispatch(setCurrentPage(page))}
            disabled={pages.current === page}
            className={`${
              pages.current === page ? 'border-red-800 bg-red-800 text-white' : 'text-black'
            } flex aspect-square items-center justify-center rounded-md border p-2`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          dispatch(setCurrentPage(pages.current + 1))
        }}
        disabled={pages.current === visiblePages[visiblePages.length - 1]}
        className={pages.current === visiblePages[visiblePages.length - 1] ? ' text-black' : 'text-red-800'}
      >
        {t('beatShopSection.t2')}
      </button>
    </div>
  )
}
