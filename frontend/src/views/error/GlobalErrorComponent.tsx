import { Link } from "@tanstack/react-router"

const GlobalErrorComponent = ({ props }: { props: Error }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center font-sans">
      <h1 className="text-[10rem] font-bold leading-none text-red-500 [text-shadow:4px_4px_0px_#adb5bd]">
        500
      </h1>
      <h2 className="text-4xl font-semibold">Server not response</h2>
      <p className="mt-2 max-w-md text-gray-600">
        Sorry, the page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <p>{props.message}</p>
      <Link
        to="/"
        className="mt-8 rounded-md bg-blue-500 px-6 py-3 font-bold text-white no-underline shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-600"
      >
        Go Back to Home
      </Link>
    </div>
  )
}

export default GlobalErrorComponent