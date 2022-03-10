import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLogbooks from "app/logbooks/queries/getLogbooks"

const ITEMS_PER_PAGE = 100

export const LogbooksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ logbooks, hasMore }] = usePaginatedQuery(getLogbooks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {logbooks.map((logbook) => (
          <li key={logbook.id}>
            <Link href={Routes.ShowLogbookPage({ logbookId: logbook.id })}>
              <a>{logbook.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const LogbooksPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Logbooks</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LogbooksList />
        </Suspense>
      </div>
    </>
  )
}

LogbooksPage.authenticate = true
LogbooksPage.getLayout = (page) => <Layout>{page}</Layout>

export default LogbooksPage
