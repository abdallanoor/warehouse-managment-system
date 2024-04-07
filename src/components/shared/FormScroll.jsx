const FormScroll = ({ children }) => {
  return (
    <>
      <div className="max-h-96 overflow-y-scroll scroll">
        <div className="flex flex-col gap-4 py-1 w-[98.5%]">{children}</div>
      </div>
    </>
  );
};

export default FormScroll;
