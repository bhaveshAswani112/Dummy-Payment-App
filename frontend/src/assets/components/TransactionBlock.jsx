export function TransactionBlock({ amount, from, to, id }) {
  return (
    <div className="flex justify-between mt-4 border border-gray-400 items-center p-4 rounded-md shadow-md">
      <div className="flex flex-col">
        <span className="text-lg font-bold">Transaction {id + 1}</span>
        <span className="text-gray-600">Amount: {amount} Rs</span>
        <span className="text-gray-600">From: {from.toUpperCase()}</span>
        <span className="text-gray-600">To: {to.toUpperCase()}</span>
      </div>
    </div>
  );
}
