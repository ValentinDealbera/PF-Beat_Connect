import { faqsAdmin, faqs } from './faqs.lib'
import { FaqsItem } from '@/components'

interface FaqsGridProps {
  mode: 'admin' | 'user'
}

export default function FaqsGrid({ mode }: FaqsGridProps) {
  const datos = mode === 'admin' ? faqsAdmin : faqs

  return (
    <div className='grid grid-cols-1 gap-estilo1  md:grid-cols-2'>
      {datos.map((faq) => (
        <FaqsItem faq={faq} key={faq.title} />
      ))}
    </div>
  )
}
