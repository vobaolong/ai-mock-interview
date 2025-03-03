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
              - A better way to
            </span>
            <br />
            improve your interview chances and skills
          </h2>

          <p className='mt-4 text-sm text-muted-foreground'>
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out.
          </p>
        </div>

        <div className='flex items-center w-full gap-12 justify-evenly md:px-12 md:py-16 md:items-center md:justify-end'>
          <p className='text-3xl font-semibold text-center text-gray-900'>
            250k+
            <span className='block text-xl font-normal text-muted-foreground'>
              Offers Received
            </span>
          </p>
          <p className='text-3xl font-semibold text-center text-gray-900'>
            1.2M+
            <span className='block text-xl font-normal text-muted-foreground'>
              Interview Aced
            </span>
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

          <div className='absolute hidden px-4 py-2 rounded-md md:block w-80 bottom-4 right-4 bg-white/60 backdrop-blur-md'>
            <h2 className='font-semibold text-neutral-800'>Developer</h2>
            <p className='text-sm text-neutral-500'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laboriosam neque suscipit architecto animi harum? Obcaecati
              pariatur ratione magni porro? Incidunt corporis iusto labore odit.
              Consequatur reiciendis aliquid animi suscipit consectetur.
            </p>

            <Button className='mt-3'>
              Generate <Sparkles />
            </Button>
          </div>
        </div>
      </Container>

      <div className='w-full my-12'>
        <Marquee pauseOnHover>
          <MarqueImg img='/img/logo/firebase.png' />
          <MarqueImg img='/img/logo/meet.png' />
          <MarqueImg img='/img/logo/zoom.png' />
          <MarqueImg img='/img/logo/firebase.png' />
          <MarqueImg img='/img/logo/microsoft.png' />
          <MarqueImg img='/img/logo/meet.png' />
          <MarqueImg img='/img/logo/tailwindcss.png' />
          <MarqueImg img='/img/logo/microsoft.png' />
        </Marquee>
      </div>

      <Container className='py-8 space-y-8'>
        <h2 className='text-xl font-semibold tracking-wide text-gray-800'>
          Unleash your potential with personalized AI insights and targeted
          interview practice.
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
              Transform the way you prepare, gain confidence, and boost your
              chances of landing your dream job. Let AI be your edge in
              today&apos;s competitive job market.
            </p>

            <Link to={'/generate'} className='w-full'>
              <Button className='w-3/4'>
                Generate <Sparkles className='ml-2' />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
