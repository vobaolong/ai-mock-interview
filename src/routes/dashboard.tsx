import { Headings } from '@/components/headings'
import { InterviewPin } from '@/components/interview-pin'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/config/firebase.config'
import { Interview } from '@/types'
import { useAuth } from '@clerk/clerk-react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)

  const { userId } = useAuth()

  useEffect(() => {
    // set upa realtime listener even for the interviews collection where the userId matches

    const interviewQuery = query(
      collection(db, 'interviews'),
      where('userId', '==', userId)
    )

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList: Interview[] = snapshot.docs.map((doc) =>
          doc.data()
        ) as Interview[]
        setInterviews(interviewList)
        setLoading(false)
      },
      (error) => {
        console.log('Error on fetching : ', error)
        toast.error('Error..', {
          description: 'Something went wrong.. Try again later..'
        })
        setLoading(false)
      }
    )

    //  clean up the listener when the component unmount

    return () => unsubscribe()
  }, [userId])

  return (
    <>
      <div className='flex items-center justify-between w-full'>
        {/* heading */}
        <Headings
          title='Dashboard'
          description='Create and start you AI Mock interview'
        />
        {/* action button */}

        <Link to={'/generate/create'}>
          <Button size={'sm'}>
            <Plus className='mr-1 min-w-5 min-h-5' />
            Add new
          </Button>
        </Link>
      </div>

      <Separator className='my-8' />

      <div className='gap-3 py-4 md:grid md:grid-cols-3'>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className='h-24 rounded-md md:h-32' />
          ))
        ) : interviews.length > 0 ? (
          interviews.map((interview) => (
            <InterviewPin key={interview.id} data={interview} />
          ))
        ) : (
          <div className='flex flex-col items-center justify-center flex-grow w-full md:col-span-3 h-96'>
            <img
              src='/svg/not-found.svg'
              className='object-contain w-44 h-44'
              alt=''
            />

            <h2 className='text-lg font-semibold text-muted-foreground'>
              No Data Found
            </h2>

            <p className='w-full mt-4 text-sm text-center md:w-96 text-neutral-400'>
              There is no available data to show. Please add some new mock
              interviews
            </p>

            <Link to={'/generate/create'} className='mt-4'>
              <Button size={'sm'}>
                <Plus className='mr-1 min-w-5 min-h-5' />
                Add New
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
