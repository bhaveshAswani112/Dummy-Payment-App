export function InputBox({ placeholder, label, type , onChange }) {
  return (
    <div className="flex flex-col justify-between items-center p-4">
      <label className="font-medium">{label}</label>
      <input
        placeholder={placeholder}
        className="w-4/5 text-center border border-gray-200 rounded-md"
        type={type}
        onChange={onChange}
      ></input>
    </div>
  );
}
