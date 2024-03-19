import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/mode-toggle";
import { TableDemo } from "./components/Table";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline mb-5">Hello world!</h1>
      <Button>Hello world!</Button> */}
      <ModeToggle />
      <div className="mt-10">
        <TableDemo />
      </div>
    </>
  );
}

export default App;
