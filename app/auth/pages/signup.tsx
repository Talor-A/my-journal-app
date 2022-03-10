import { useRouter, BlitzPage, Routes } from "blitz"
import Centered from "app/core/layouts/Centered"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <main>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </main>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Centered title="Sign Up">{page}</Centered>

export default SignupPage
