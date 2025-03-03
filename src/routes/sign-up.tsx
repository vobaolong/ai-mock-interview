import { SignUp } from '@clerk/clerk-react'

export const SignUpPage = () => {
  return (
    <div className='relative flex items-center justify-center w-screen h-screen overflow-hidden'>
      <img
        src='/img/bg.png'
        alt=''
        className='absolute object-cover w-full h-full opacity-20'
      />

      <SignUp path='/sign-up' />
    </div>
  )
}
