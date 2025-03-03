import { Button } from '@/components/ui/button'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { Loader } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ProfileContainer = () => {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <div className='flex items-center'>
        <Loader className='text-blue-500 min-w-4 min-h-4 animate-spin' />
      </div>
    )
  }

  return (
    <div className='flex items-center gap-5'>
      {isSignedIn ? (
        <UserButton afterSignOutUrl='/' />
      ) : (
        <>
          <Link to={'/sign-in'}>
            <Button
              className='rounded-sm cursor-pointer'
              size={'sm'}
              variant={'outline'}
            >
              Login
            </Button>
          </Link>

          <Link to={'/sign-up'}>
            <Button
              className='bg-blue-700 rounded-sm cursor-pointer hover:bg-blue-900'
              size={'sm'}
            >
              Get Started
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}
