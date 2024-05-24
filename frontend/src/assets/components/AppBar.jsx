export function AppBar({ name }) {
  return (
    <div className="flex justify-between shadow-lg h-14">
      <div className="flex flex-col justify-center pl-4 h-full font-semibold">
        PayTM App
      </div>
      <div className="flex items-center pr-4 justify-between font-semibold">
        <div className="mr-1">Hello</div>
        <div className="rounded-full bg-slate-200 w-24 h-8 ml-1 flex flex-col justify-center items-center">
          {name.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
