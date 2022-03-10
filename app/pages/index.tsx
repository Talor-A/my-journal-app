import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import CenteredLayout from "app/core/layouts/Centered"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="text-blue-500 hover:text-blue-700">
            <strong>Sign Up</strong>
          </a>
        </Link>
        {" / "}
        <Link href={Routes.LoginPage()}>
          <a className="text-blue-500 hover:text-blue-700">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <main>
      <p>
        <strong>Welcome!</strong> Ready to get started?
      </p>
      <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>
    </main>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <CenteredLayout title="Home">{page}</CenteredLayout>
Home.redirectAuthenticatedTo = "/logbooks/1"
export default Home
