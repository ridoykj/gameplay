import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <Suspense fallback={<ErrorPage />}> */}
      <div className='flex flex-col h-screen bg-gray-100 overflow-hidden'>
        {/* <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} /> */}
        <main className='flex flex-1 overflow-hidden'>
          {/* SideNav: Hidden on small screens, visible from medium screens up */}
          {/* <SideNav isSidebarOpen={isSidebarOpen} /> */}
          {/* Main content area */}
          <section className='flex-1 p-6 overflow-y-auto'>
            <Outlet />
          </section>
        </main>
        {/* <Footer /> */}
      </div>
      {/* </Suspense> */}
    </>
  )
}
