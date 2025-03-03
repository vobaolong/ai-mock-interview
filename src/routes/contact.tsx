import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

type FormData = z.infer<typeof formSchema>

export const ContactUsPage = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    methods.reset()
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-4 bg-gray-100'>
      <Card className='w-full max-w-2xl p-8 shadow-lg bg-white/50 backdrop-blur-md rounded-2xl'>
        <h1 className='mb-2 text-3xl font-bold text-center text-gray-800'>
          Contact Us
        </h1>
        <p className='mb-6 text-center text-gray-600'>
          We'd love to hear from you!
        </p>
        <CardContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='space-y-5'
            >
              <div>
                <Input {...methods.register('name')} placeholder='Your Name' />
                <p className='text-sm text-red-500'>
                  {methods.formState.errors.name?.message}
                </p>
              </div>
              <div>
                <Input
                  {...methods.register('email')}
                  type='email'
                  placeholder='Your Email'
                />
                <p className='text-sm text-red-500'>
                  {methods.formState.errors.email?.message}
                </p>
              </div>
              <div>
                <Input {...methods.register('subject')} placeholder='Subject' />
                <p className='text-sm text-red-500'>
                  {methods.formState.errors.subject?.message}
                </p>
              </div>
              <div>
                <Textarea
                  {...methods.register('message')}
                  placeholder='Your Message'
                  className='min-h-[150px]'
                />
                <p className='text-sm text-red-500'>
                  {methods.formState.errors.message?.message}
                </p>
              </div>
              <Button type='submit' className='w-full'>
                Send Message
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  )
}
