const Input = ({
  label,
  error,
  helperText,
  ...props
}) => {
  return (
    <div className="mb-5 space-y-1">
      {label && (
        <label className="block text-sm font-medium text-navy">
          {label}
        </label>
      )}

      <input
        className={`w-full px-3 py-2 rounded-md border bg-white text-navy
          placeholder:text-navyMuted
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold
          ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-navy/20"
          }
        `}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="text-xs text-navyMuted">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;