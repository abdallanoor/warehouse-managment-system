const Heading = ({ children }) => {
  return (
    <h1 className="text-4xl max-lg:text-center font-extrabold mb-8 lg:mb-10 print:text-3xl">
      {children}
    </h1>
  );
};

export default Heading;
