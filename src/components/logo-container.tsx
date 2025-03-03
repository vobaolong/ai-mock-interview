import { Link } from 'react-router-dom'

export const LogoContainer = () => {
  return (
    <Link to={'/'}>
      <img
        src='/svg/logo.svg'
        alt='Logo'
        className='object-contain max-w-10 max-h-10'
      />
    </Link>
  )
}
