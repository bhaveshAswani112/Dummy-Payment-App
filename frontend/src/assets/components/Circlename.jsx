export const CircleName = function ({ charac, fullname }) {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full h-8 w-8 bg-slate-600 flex flex-col justify-center items-center mx-3">
        {charac}
      </div>
      <div className="text-left w-48">{fullname}</div>
    </div>
  );
};
