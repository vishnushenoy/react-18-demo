import { FC } from "react";

export const sleepSync = (time: number) => {
  const now = performance.now();
  while (performance.now() - now < time) {}
};

export const Card: FC<{ notes?: string }> = ({ children, notes }) => {
  return (
    <div className="absolute inset-0 flex flex-col">
       {notes && <div className="bg-black text-white text-xl p-5 font-bold">{notes}</div>}
      <div className="flex items-center justify-center flex-1">
        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-5 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};
