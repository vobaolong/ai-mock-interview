import { SignIn } from '@clerk/clerk-react'

export const SignInPage = () => {
  return (
    <div className='relative flex items-center justify-center w-screen h-screen bg-gray-100'>
      <img
        src='/img/bg.png'
        alt='Background'
        className='absolute object-cover w-full h-full opacity-20'
      />

      <div className='relative flex w-3/4 max-w-4xl overflow-hidden bg-white rounded-lg shadow-lg'>
        <div className='items-center justify-center hidden w-1/2 md:flex'>
          <img
            src='/img/login-illustration.png'
            alt='Login Illustration'
            className='object-cover h-full border border-gray-300 rounded-tl-sm rounded-bl-sm'
          />
        </div>
        <div className='flex flex-col justify-center w-1/2 p-8'>
          <h2 className='mb-6 text-2xl font-bold text-center'>Welcome Back</h2>

          <SignIn
            path='/sign-in'
            appearance={{
              variables: {
                colorPrimary: '#2563eb',
                colorText: '#1f2937',
                colorBackground: '#ffffff',
                colorInputBackground: '#f3f4f6',
                borderRadius: '8px'
              },
              elements: {
                card: 'shadow-md p-4',
                formButtonPrimary:
                  'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
