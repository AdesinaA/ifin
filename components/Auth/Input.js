const Input = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-[#162844] mb-1">{label}</label>
      <input
        className={`w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-formPrimary ${
          error ? "border-error text-error" : "border-borderColor"
        }`}
        {...props}
      />
    </div>
  );
};

export default Input;
