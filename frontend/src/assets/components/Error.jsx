export const ErrorMessage = function ({ message }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-red-500">{message}</div>
    </div>
  );
};
