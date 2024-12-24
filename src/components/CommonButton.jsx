
const CommonButton = ({ type, children, className }) => {
  return (
    <button type={type} className={`btn border py-2 px-2 mt-5 rounded-lg hover:border-orange-500 hover:bg-white bg-orange-500 text-white hover:text-orange-500 w-full ${className}`}>
      {children}
    </button>
  );
};

export default CommonButton;
