import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
        <FiAlertTriangle className="text-red-500 dark:text-red-400 w-20 h-20 mb-6" />

        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2 text-center">
          404
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">
          Oops! The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
        >
          Go Back Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
