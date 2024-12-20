const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-orange-500">404</h1>
            <p className="text-lg text-gray-700 mt-4">Oops! The page you are looking for does not exist.</p>
            <a
                href="/"
                className="mt-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none"
            >
                Go back to Home
            </a>
        </div>
    );
};

export default ErrorPage;