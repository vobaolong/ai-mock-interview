import { cn } from '@/lib/utils'

export const MarqueImg = ({
  img,
  className
}: {
  img: string
  className: string
}) => {
  return (
    <img
      src={img}
      className={cn(
        'object-contain mx-12 w-44 h-44 xl:w-52 xl:h-52 grayscale xl:mx-16',
        className
      )}
      alt=''
    />
  )
}
