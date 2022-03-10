import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLogbook from "app/logbooks/queries/getLogbook"
import deleteLogbook from "app/logbooks/mutations/deleteLogbook"

export const Logbook = () => {
  const router = useRouter()
  const logbookId = useParam("logbookId", "number")
  const [logbook] = useQuery(getLogbook, { id: logbookId })

  return (
    <>
      <Head>
        <title>{logbook.name}</title>
      </Head>

      <div>
        <h1>{logbook.name}</h1>
      </div>
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
