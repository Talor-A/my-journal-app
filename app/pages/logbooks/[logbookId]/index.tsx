import { ReactNode, Suspense } from "react"
import {
  Head,
  Link,
  useRouter,
  useQuery,
  useParam,
  BlitzPage,
  useMutation,
  Routes,
  Image,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getLogbook from "app/logbooks/queries/getLogbook"
import deleteLogbook from "app/logbooks/mutations/deleteLogbook"

export const Header = () => (
  <div className="flex items-center p-3 border-b border-gray-300">
    <div className="relative">
      <Image
        className="object-cover w-10 h-10 rounded-full"
        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
        alt="username"
        height={40}
        width={40}
      />
      <span className="absolute w-3 h-3 bg-green-600 rounded-full left-0 top-0"></span>
    </div>
    <span className="block ml-2 font-bold text-gray-600">Emma</span>
  </div>
)

import React from "react"

interface MessageProps {
  children: ReactNode
  left?: boolean
}

const Message = ({ children, left = false }: MessageProps) => {
  return (
    <li className={`flex ${left ? "justify-start" : "justify-end"} w-full`}>
      <div className="max-w-xl px-4 py-2 text-gray-700 rounded-xl border my-0.5">
        <span className="block">{children}</span>
      </div>
    </li>
  )
}
const MessageList = ({ children }: { children: ReactNode }) => (
  <div className="flex w-full p-6 overflow-y-auto h-[40rem]">
    <ul className="w-full">{children}</ul>
  </div>
)

const BottomBar = () => (
  <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
        />
      </svg>
    </button>

    <input
      type="text"
      placeholder="Message"
      className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
      name="message"
      required
    />
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    </button>
    <button type="submit">
      <svg
        className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    </button>
  </div>
)

export const MessageView = ({ children }: { children: ReactNode }) => (
  <div className="container mx-auto">
    <div className="max-w-2xl border">
      <div>
        <div className="w-full flex flex-col items-stretch justify-between">{children}</div>
      </div>
    </div>
  </div>
)

export const Logbook = () => {
  const router = useRouter()
  const logbookId = useParam("logbookId", "number")
  const [logbook] = useQuery(getLogbook, { id: logbookId })

  return (
    <>
      <Head>
        <title>{logbook.name}</title>
      </Head>
      <MessageView>
        <Header />
        <MessageList>
          <Message>Hi</Message>
          <Message left>Hiiii</Message>
          <Message>how are you?</Message>
          <Message>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </Message>
        </MessageList>

        <BottomBar />
      </MessageView>
    </>
  )
}

const ShowLogbookPage: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Logbook />
      </Suspense>
    </main>
  )
}

ShowLogbookPage.authenticate = true
ShowLogbookPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLogbookPage
