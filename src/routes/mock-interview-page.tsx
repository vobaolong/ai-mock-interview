import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { Lightbulb } from 'lucide-react'
import { db } from '@/config/firebase.config'
import { LoaderPage } from '@/views/loader-page'
import { CustomBreadCrumb } from '@/components/custom-bread-crumb'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Interview } from '@/types'
import { QuestionSection } from '@/containers/question-section'

export const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>()
  const [interview, setInterview] = useState<Interview | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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

      fetchInterview()
    }
  }, [interviewId, navigate])

  if (isLoading) {
    return <LoaderPage className='w-full h-[70vh]' />
  }

  return (
    <div className='flex flex-col w-full gap-8 py-5'>
      <CustomBreadCrumb
        breadCrumbPage='Start'
        breadCrumpItems={[
          { label: 'Mock Interviews', link: '/generate' },
          {
            label: interview?.position || '',
            link: `/generate/interview/${interview?.id}`
          }
        ]}
      />

      <div className='w-full'>
        <Alert className='flex items-start gap-3 p-4 border rounded-lg bg-sky-100 border-sky-200'>
          <Lightbulb className='w-5 h-5 text-sky-600' />
          <div>
            <AlertTitle className='font-semibold text-sky-800'>
              Important Note
            </AlertTitle>
            <AlertDescription className='mt-1 text-sm leading-relaxed text-sky-700'>
              Press "Record Answer" to begin answering the question. Once you
              finish the interview, you&apos;ll receive feedback comparing your
              responses with the ideal answers.
              <br />
              <br />
              <strong>Note:</strong>{' '}
              <span className='font-medium'>Your video is never recorded.</span>{' '}
              You can disable the webcam anytime if preferred.
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {interview?.questions && interview?.questions.length > 0 && (
        <div className='flex flex-col items-start w-full gap-4 mt-4'>
          <QuestionSection questions={interview?.questions} />
        </div>
      )}
    </div>
  )
}
