import { Sparkles } from 'lucide-react'
import Marquee from 'react-fast-marquee'

import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { MarqueImg } from '@/components/marquee-img'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className='flex-col w-full pb-24'>
      <Container>
        <div className='my-8'>
          <h2 className='text-3xl text-center md:text-left md:text-6xl'>
            <span className='font-extrabold text-outline md:text-8xl'>
              AI Superpower
            </span>
            <span className='font-extrabold text-gray-500'>
              - The smarter way to
            </span>
            <br />
            boost your interview success and expertise.
          </h2>

          <p className='mt-4 text-sm text-muted-foreground'>
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out.
          </p>
        </div>

        <div className='w-full mt-4 rounded-xl bg-gray-100 h-[420px] drop-shadow-md overflow-hidden relative'>
          <img
            src='/img/hero.jpg'
            alt=''
            className='object-cover w-full h-full'
          />

          <div className='absolute px-4 py-2 rounded-md top-4 left-4 bg-white/40 backdrop-blur-md'>
            Interviews Copilot&copy;
          </div>

          <div className='absolute hidden px-4 py-2 rounded-md md:block w-100 bottom-4 right-4 bg-white/60 backdrop-blur-md'>
            <h2 className='font-semibold text-neutral-800'>Developer</h2>
            <p className='text-sm text-neutral-500'>
              AI mock interviews help candidates prepare for real interviews by
              simulating job-specific questions, evaluating responses, and
              providing instant feedback. They improve communication skills,
              identify weaknesses, and boost confidence with personalized,
              adaptive practice.
            </p>
            <Link to={'/generate'} className='flex justify-end w-full'>
              <Button className='mt-3 bg-blue-700 rounded-sm cursor-pointer hover:bg-blue-900'>
                Generate <Sparkles />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      <Marquee pauseOnHover>
        <MarqueImg
          img='/img/logo/firebase.png'
          className='!w-30 !h-30 md:w-20 md:h-20'
        />
        <MarqueImg
          img='/img/logo/meet.png'
          className='!w-30 !h-30 md:w-20 md:h-20'
        />
        <MarqueImg
          img='/img/logo/zoom.png'
          className='!w-30 !h-30 md:w-20 md:h-20'
        />
        <MarqueImg
          img='/img/logo/firebase.png'
          className='!w-30 !h-30 md:w-20 md:h-20'
        />
        <MarqueImg
          img='/img/logo/microsoft.png'
          className='!w-30 !h-30 md:w-20 md:h-20'
        />
        <MarqueImg
          img='/img/logo/meet.png'
          className='!w-30 !h-30 md:w-20 md:h-20'
        />
        <MarqueImg
          img='/img/logo/tailwindcss.png'
          className='!w-30 !h-30 md:w-20 md:h-20'
        />
        <MarqueImg
          img='/img/logo/microsoft.png'
          className='!w-30 !h-30 md:w-20 md:h-20'
        />
      </Marquee>

      <Container className='py-8 space-y-8'>
        <h2 className='text-xl font-semibold tracking-wide text-gray-800'>
          AI-powered mock interviews simulate real interview scenarios, assess
          responses, and provide instant feedback, helping candidates refine
          their skills, build confidence, and improve their chances of success.
        </h2>

        <div className='grid grid-cols-1 gap-3 md:grid-cols-5'>
          <div className='col-span-1 md:col-span-3'>
            <img
              src='/img/office.jpg'
              alt=''
              className='object-cover w-full rounded-md max-h-96'
            />
          </div>

          <div className='flex flex-col items-center justify-center w-full col-span-1 gap-8 text-center md:col-span-2 max-h-96 min-h-96'>
            <p className='text-center text-muted-foreground'>
              Enhance your preparation, build confidence, and increase your
              chances of landing your dream job. Let AI give you the edge in
              today&apos;s competitive job market.
            </p>

            <Link to={'/generate'} className='w-3/4 bg-red-50'>
              <Button className='w-full bg-blue-700 rounded-sm cursor-pointer hover:bg-blue-900'>
                Generate <Sparkles />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
