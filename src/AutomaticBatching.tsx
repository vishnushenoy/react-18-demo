import { useRef, useState, Profiler } from "react";


export const AutomaticBatching=()=> {
  const [clickCount, setClickCount] = useState(0);
  const [active, setActive] = useState(0);
  const renderCounter = useRef(0);

  const handleClickWithTimeOut = () => {
    setTimeout(() => {
      setClickCount((clickCount) => clickCount + 1);
      setActive((active) => active + 1);
    });
  };

  const fetchData = new Promise((resolve) => setTimeout(resolve, 100));

  const handleClickWithFetch = () => {
    fetchData.then(() => {
      setClickCount((clickCount) => clickCount + 1);
      setActive((active) => active + 1);
    });
  };

  const handleClick = () => {
    setClickCount((clickCount) => clickCount + 1);
    setActive((active) => active + 1);
  };

  return (
    <Profiler
      id="test"
      onRender={(...args) => {
        console.log(args);
        renderCounter.current = renderCounter.current + 1;
      }}
    >
      <div className="p-5">
        <div>
          <h3>setTimeout</h3>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full" onClick={handleClickWithTimeOut}>Click me!</button>
        </div>

        <div>
          <h3>Promise</h3>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full" onClick={handleClickWithFetch}>Click me!</button>
        </div>

        <div>
          <h3>eventListener</h3>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full" onClick={handleClick}>Click me!</button>
        </div>
        <div>
          <div className="mt-5">
            <p className="mb-4">
              <span className="p-2 border rounded-lg w-full">{clickCount}</span> updates
            </p>

            <p>
              <span className="p-2 border rounded-lg w-full ">{renderCounter.current}</span> rerenders
            </p>
          </div>
        </div>
      </div>
    </Profiler>
  );
}