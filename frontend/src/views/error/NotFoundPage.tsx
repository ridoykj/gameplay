
const NotFoundPage = () => {
    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-8 max-w-md w-full text-center text-white">
                <h1 className="text-9xl font-bold drop-shadow-lg">404</h1>
                <h2 className="text-3xl font-semibold mt-4 drop-shadow-md">
                    Page Not Found
                </h2>
                <p className="mt-4 text-white/80">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <a
                    href="/"
                    className="mt-8 inline-block bg-white/30 hover:bg-white/40 backdrop-blur-xl text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 border border-white/40 shadow-lg"
                >
                    Return to Homepage
                </a>
            </div>
        </main>
    );
};

export default NotFoundPage