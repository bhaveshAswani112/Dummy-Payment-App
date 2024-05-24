export const SearchBox = function ({ onChange }) {
  return (
    <div className="pl-4">
      <input
        type="text"
        placeholder="Search users..."
        className="w-4/5 border border-gray-200 rounded-md pl-2"
        onChange={onChange}
      ></input>
    </div>
  );
};
