export const Balance = function ({ balance }) {
  return (
    <div className="p-4">
      <span className="font-medium">Your Balance </span>{" "}
      <span>Rs {balance}</span>
    </div>
  );
};
