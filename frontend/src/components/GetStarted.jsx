import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <Link to="/journals" className="inline-block">
      <button
        className="px-8 py-3 rounded-md bg-[#FFC000] text-white hover:bg-yellow-500 font-bold"
      >
        Get Started
      </button>
    </Link>
  );
};

export default GetStarted;

