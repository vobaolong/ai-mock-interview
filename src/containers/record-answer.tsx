import WebCam from 'react-webcam'
import {
  CircleStop,
  Loader,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
  WebcamIcon
} from 'lucide-react'

import useSpeechToText, { ResultType } from 'react-hook-speech-to-text'

import { TooltipButton } from '@/components/tooltip-button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { chatSession } from '@/scripts/ai-studio'
import { SaveModal } from '@/components/save-modal'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from '@/config/firebase.config'
import { useAuth } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'

interface RecordAnswerProps {
  question: { question: string; answer: string }
  isWebCam: boolean
  setIsWebCam: (value: boolean) => void
}

interface AIResponse {
  ratings: number
  feedback: string
}

export const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam
}: RecordAnswerProps) => {
  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  })

  const [userAnswer, setUserAnswer] = useState('')
  const [isAiGenerating, setIsAiGenerating] = useState(false)
  const [aiResult, setAiResult] = useState<AIResponse | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { userId } = useAuth()
  const { interviewId } = useParams()

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText()

      if (userAnswer?.length < 30) {
        toast.error('Error', {
          description: 'Your answer should be more than 30 characters'
        })

        return
      }

      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      )

      setAiResult(aiResult)
    } else {
      startSpeechToText()
    }
  }

  const cleanJsonResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim()

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, '')

    // Step 3: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanText)
    } catch (error) {
      throw new Error('Invalid JSON format: ' + (error as Error)?.message)
    }
  }

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true)

    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `

    try {
      const aiResult = await chatSession.sendMessage(prompt)

      const parsedResult: AIResponse = cleanJsonResponse(
        aiResult.response.text()
      )
      return parsedResult
    } catch (error) {
      console.log(error)
      toast('Error', {
        description: 'An error occurred while generating feedback.'
      })
      return { ratings: 0, feedback: 'Unable to generate feedback' }
    } finally {
      setIsAiGenerating(false)
    }
  }

  const recordNewAnswer = () => {
    setUserAnswer('')
    stopSpeechToText()
    startSpeechToText()
  }

  const saveUserAnswer = async () => {
    setLoading(true)

    if (!aiResult) {
      return
    }

    const currentQuestion = question.question

    try {
      // query the firebase to check if the user answer already exists for this question

      const userAnswerQuery = query(
        collection(db, 'userAnswers'),
        where('userId', '==', userId),
        where('question', '==', currentQuestion)
      )

      const querySnap = await getDocs(userAnswerQuery)

      // if the user already answered the question don't save it again
      if (!querySnap.empty) {
        console.log('Query Snap Size', querySnap.size)
        toast.info('Already Answered', {
          description: 'You have already answered this question'
        })
        return
      } else {
        // save the answer

        const questionAnswerRef = await addDoc(collection(db, 'userAnswers'), {
          mockIdRef: interviewId,
          question: question.question,
          correct_ans: question.answer,
          user_ans: userAnswer,
          feedback: aiResult.feedback,
          rating: aiResult.ratings,
          userId,
          createdAt: serverTimestamp()
        })

        const id = questionAnswerRef.id

        await updateDoc(doc(db, 'userAnswers', id), {
          id,
          updatedAt: serverTimestamp()
        })

        toast('Saved', { description: 'Your answer has been saved..' })
      }

      setUserAnswer('')
      stopSpeechToText()
    } catch (error) {
      toast('Error', {
        description: 'An error occurred while generating feedback.'
      })
      console.log(error)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  useEffect(() => {
    const combinedTranscripts = results
      .filter((result): result is ResultType => typeof result !== 'string')
      .map((result) => result.transcript)
      .join(' ')

    setUserAnswer(combinedTranscripts)
  }, [results])

  return (
    <div className='flex flex-col items-center w-full gap-8 mt-4'>
      {/* save modal */}

      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
      />

      <div className='w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md'>
        {isWebCam ? (
          <WebCam
            onUserMedia={() => setIsWebCam(true)}
            onUserMediaError={() => setIsWebCam(false)}
            className='object-cover w-full h-full rounded-md'
          />
        ) : (
          <WebcamIcon className='min-w-24 min-h-24 text-muted-foreground' />
        )}
      </div>

      {/* action buttons group */}
      <div className='flex items-center justify-center gap-3'>
        <TooltipButton
          content={isWebCam ? 'Turn Off' : 'Turn On'}
          icon={
            isWebCam ? (
              <VideoOff className='min-w-5 min-h-5' />
            ) : (
              <Video className='min-w-5 min-h-5' />
            )
          }
          onClick={() => setIsWebCam(!isWebCam)}
        />

        <TooltipButton
          content={isRecording ? 'Stop Recording' : 'Start Recording'}
          icon={
            isRecording ? (
              <CircleStop className='min-w-5 min-h-5' />
            ) : (
              <Mic className='min-w-5 min-h-5' />
            )
          }
          onClick={recordUserAnswer}
        />

        <TooltipButton
          content='Record Again'
          icon={<RefreshCw className='min-w-5 min-h-5' />}
          onClick={recordNewAnswer}
        />

        <TooltipButton
          content='Save Result'
          icon={
            isAiGenerating ? (
              <Loader className='min-w-5 min-h-5 animate-spin' />
            ) : (
              <Save className='min-w-5 min-h-5' />
            )
          }
          onClick={() => setOpen(!open)}
          disabled={!aiResult}
        />
      </div>

      <div className='w-full p-4 mt-4 border rounded-md bg-gray-50'>
        <h2 className='text-lg font-semibold'>Your Answer:</h2>
        <p className='mt-2 text-sm text-gray-700 whitespace-normal'>
          {userAnswer || 'Start recording to see your answer here'}
        </p>

        {interimResult && (
          <p className='mt-2 text-sm text-gray-500'>
            <strong>Current Speech:</strong>
            {interimResult}
          </p>
        )}
      </div>
    </div>
  )
}
