import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLogbook from "app/logbooks/queries/getLogbook"
import deleteLogbook from "app/logbooks/mutations/deleteLogbook"

export const Logbook = () => {
  const router = useRouter()
  const logbookId = useParam("logbookId", "number")
  const [deleteLogbookMutation] = useMutation(deleteLogbook)
  const [logbook] = useQuery(getLogbook, { id: logbookId })

  return (
    <>
      <Head>
        <title>Logbook {logbook.id}</title>
      </Head>

      <div>
        <h1>Logbook {logbook.id}</h1>
        <pre>{JSON.stringify(logbook, null, 2)}</pre>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLogbookMutation({ id: logbook.id })
              router.push(Routes.LogbooksPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowLogbookPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.LogbooksPage()}>
          <a>Logbooks</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Logbook />
      </Suspense>
    </div>
  )
}

ShowLogbookPage.authenticate = true
ShowLogbookPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLogbookPage
