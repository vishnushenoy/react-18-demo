import clsx from "clsx";
import { FC } from "react";
import { BrowserRouter, Link, Route, Routes, useMatch } from "react-router-dom";
import { StartTransition } from "./UseTransition";
import { Tearing } from "./Tearing";
import { UseDeferredValue } from "./UseDeferredValue";
import { isConcurrent } from ".";
import { Toggle } from "rsuite";
import { AutomaticBatching } from "./AutomaticBatching";

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen flex flex-col">
        <div className="flex-1 relative flex">
          <Sidebar />
          <div className="flex-1 bg-yellow-50 relative">
            <Routes>
              {/* <Route element={<Home />} index /> */}
              <Route
                path="/concurrent/use-deferred-value"
                element={<UseDeferredValue />}
              />
              <Route path="/concurrent/use-transition" element={<StartTransition />} />
              <Route path="/concurrent/tearing" element={<Tearing />} />
              <Route path="/concurrent/automatic-batching" element={<AutomaticBatching />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

const Section: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div>
      <div className="text-sm mb-2 font-semibold">{title}</div>
      <div>{children}</div>
    </div>
  );
};

const MenuItem: FC<{ path: string }> = ({ path, children }) => {
  const isActive = useMatch(path);

  return (
    <Link
      to={path}
      className={clsx(
        "px-3 py-1.5 cursor-pointer hover:bg-white hover:bg-opacity-10 transition rounded-lg block text-white no-underline hover:no-underline focus:no-underline active:text-blue-500 focus:text-blue-500",
        isActive && "!text-blue-500",
      )}
    >
      {children}
    </Link>
  );
};

export default App;

const Sidebar = () => {
  return (
    <div
      className="bg-gray-800 text-white w-full space-y-4 flex flex-col justify-between"
      style={{ maxWidth: 250 }}
    >
      <div className="space-y-4 p-5">
        <div className="text-2xl font-bold">React 18 Demos</div>
        <ConcurrentModeSwitch />
        <Section title="Concurrent Rendering">
          <MenuItem path="/concurrent/use-deferred-value">useDeferredValue</MenuItem>
          <MenuItem path="/concurrent/use-transition">useTransition</MenuItem>
          <MenuItem path="/concurrent/tearing">Tearing</MenuItem>
          <MenuItem path="/concurrent/automatic-batching">Automatic Batching</MenuItem>
        </Section>
      </div>
    </div>
  );
};

const ConcurrentModeSwitch = () => {
  return (
    <div className="text-white font-bold py-3 text-center bg-white bg-opacity-10 rounded-lg space-y-2">
      <div>Concurrent rendering is...</div>
      <div className="flex justify-center items-center w-full space-x-2">
        <span
          className={clsx(
            isConcurrent() ? "bg-green-500" : "bg-red-500",
            "px-2 rounded-full",
          )}
        >
          {isConcurrent() ? "ON" : "OFF"}
        </span>
        <Toggle
          checked={isConcurrent()}
          onChange={(value) => {
            localStorage.setItem("concurrentModeEnabled", value ? "true" : "false");
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};
