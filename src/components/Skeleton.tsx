import clsx from 'clsx';

export default function SkeletonCard({isLoading}:{isLoading?: boolean} ) {
  return (
    <div className={clsx(
      'flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300',
      {
        'relative overflow-hidden before:absolute before:inset-4 before:-translate-x-full before:animate-pulse': 
        isLoading
      }
    )}>
      <div className='relative max-h-72 flex-1 bg-zinc-700'></div>
      <div className='flex justify-between font-bold my-3 bg-zinc-700'></div>
      <div className='h-3 w-8/12 rounded-lg bg-zinc-700'></div>
    </div>
  )
}