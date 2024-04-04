import { useEffect, useState, useRef, useCallback } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [charlength, setCharlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(0);
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let num = "123456789";
  let splChar = "!@#$%^&*(){}";

  const RandomNumberGenerator = useCallback(() => {
    let pass = "";
    if (numberAllowed) str += num;
    if (charAllowed) str += splChar;
    for (let i = 1; i <= charlength; i++) {
      let ran = Math.floor(Math.random() * str.length);
      pass += str.charAt(ran);
    }
    setPassword(pass);
  }, [setPassword, charlength, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    console.log("copied");
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    RandomNumberGenerator();
  }, [charlength, numberAllowed, charAllowed, RandomNumberGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600 active:bg-orange-500"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={charlength}
            className="cursor-pointer"
            onChange={(e) => {
              setCharlength(e.target.value);
            }}
          />
          <label>Length: {charlength}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
