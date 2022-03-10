import Layout, { LayoutProps } from "./Layout"

const CenteredLayout = ({ children, ...props }: LayoutProps) => {
  return (
    <Layout {...props}>
      <div className="flex flex-col items-center justify-center h-screen">{children}</div>
    </Layout>
  )
}

export default CenteredLayout
