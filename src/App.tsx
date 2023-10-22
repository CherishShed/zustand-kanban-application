import { Column } from "./components/column";
import "./App.css";
import { Modal } from "./components/modal";

function App() {
  const columns = ["PLANNED", "ONGOING", "DONE"];
  return (
    <div className="flex min-h-screen justify-center items-start gap-5 bg-gray-400">
      {columns.map((column, index) => (
        <Column status={column} key={index}></Column>
      ))}

      <Modal/>
    </div>
  );
}

export default App;
