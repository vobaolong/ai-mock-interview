import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { useAuth } from '@clerk/clerk-react'

import { LoaderPage } from '@/views/loader-page'
import { CustomBreadCrumb } from '@/components/custom-bread-crumb'
import { Headings } from '@/components/headings'
import { InterviewPin } from '@/components/interview-pin'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import { db } from '@/config/firebase.config'
import { Interview, UserAnswer } from '@/types'
import { cn } from '@/lib/utils'
import { CircleCheck, Star } from 'lucide-react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

export const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>()
  const [interview, setInterview] = useState<Interview | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([])
  const [activeFeed, setActiveFeed] = useState('')
  const { userId } = useAuth()
  const navigate = useNavigate()

  if (!interviewId) {
    navigate('/generate', { replace: true })
  }

  useEffect(() => {
    if (interviewId) {
      const fetchInterview = async () => {
        setIsLoading(true)
        try {
          const interviewDoc = await getDoc(doc(db, 'interviews', interviewId))
          if (interviewDoc.exists()) {
            setInterview({ ...interviewDoc.data() } as Interview)
          } else {
            navigate('/generate', { replace: true })
          }
        } catch (error) {
          console.log(error)
          toast('Error', {
            description: 'Something went wrong. Please try again later..'
          })
        } finally {
          setIsLoading(false)
        }
      }

      const fetchFeedbacks = async () => {
        setIsLoading(true)
        try {
          const querSanpRef = query(
            collection(db, 'userAnswers'),
            where('userId', '==', userId),
            where('mockIdRef', '==', interviewId)
          )

          const querySnap = await getDocs(querSanpRef)

          const interviewData: UserAnswer[] = querySnap.docs.map((doc) => {
            return doc.data() as UserAnswer
          })

          setFeedbacks(interviewData)
        } catch (error) {
          console.log(error)
          toast('Error', {
            description: 'Something went wrong. Please try again later..'
          })
        } finally {
          setIsLoading(false)
        }
      }

      fetchInterview()
      fetchFeedbacks()
    }
  }, [interviewId, navigate, userId])

  //   calculate the ratings out of 10

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) return '0.0'

    const totalRatings = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    )

    return (totalRatings / feedbacks.length).toFixed(1)
  }, [feedbacks])

  if (isLoading) {
    return <LoaderPage className='w-full h-[70vh]' />
  }

  return (
    <div className='flex flex-col w-full gap-8 py-5'>
      <div className='flex items-center justify-between w-full gap-2'>
        <CustomBreadCrumb
          breadCrumbPage={'Feedback'}
          breadCrumpItems={[
            { label: 'Mock Interviews', link: '/generate' },
            {
              label: `${interview?.position}`,
              link: `/generate/interview/${interview?.id}`
            }
          ]}
        />
      </div>

      <Headings
        title='Congratulations !'
        description='Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview.'
      />

      <p className='text-base text-muted-foreground'>
        Your overall interview ratings :{' '}
        <span className='text-xl font-semibold text-emerald-500'>
          {overAllRating} / 10
        </span>
      </p>

      {interview && <InterviewPin data={interview} onMockPage />}

      <Headings title='Interview Feedback' isSubHeading />

      {feedbacks && (
        <Accordion type='single' collapsible className='space-y-6'>
          {feedbacks.map((feed) => (
            <AccordionItem
              key={feed.id}
              value={feed.id}
              className='border rounded-lg shadow-md'
            >
              <AccordionTrigger
                onClick={() => setActiveFeed(feed.id)}
                className={cn(
                  'px-5 py-3 flex items-center justify-between text-base rounded-t-lg transition-colors hover:no-underline',
                  activeFeed === feed.id
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50'
                    : 'hover:bg-gray-50'
                )}
              >
                <span>{feed.question}</span>
              </AccordionTrigger>

              <AccordionContent className='px-5 py-6 space-y-5 bg-white rounded-b-lg shadow-inner'>
                <div className='text-lg font-semibold to-gray-700'>
                  <Star className='inline mr-2 text-yellow-400' />
                  Rating : {feed.rating}
                </div>

                <Card className='p-4 space-y-3 border-none rounded-lg shadow-md bg-green-50'>
                  <CardTitle className='flex items-center'>
                    <CircleCheck className='mr-2 text-green-600' />
                    Expected Answer
                  </CardTitle>

                  <CardDescription className='font-medium text-gray-700'>
                    {feed.correct_ans}
                  </CardDescription>
                </Card>

                <Card className='p-4 space-y-3 border-none rounded-lg shadow-md bg-blue-50'>
                  <CardTitle className='flex items-center'>
                    <CircleCheck className='mr-2 text-blue-600' />
                    Your Answer
                  </CardTitle>

                  <CardDescription className='font-medium text-gray-700'>
                    {feed.user_ans}
                  </CardDescription>
                </Card>

                <Card className='p-4 space-y-3 border-none rounded-lg shadow-md bg-red-50'>
                  <CardTitle className='flex items-center'>
                    <CircleCheck className='mr-2 text-red-600' />
                    Feedback
                  </CardTitle>

                  <CardDescription className='font-medium text-gray-700'>
                    {feed.feedback}
                  </CardDescription>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
