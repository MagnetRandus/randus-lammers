import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ISchemaA } from "./api/interfaces/dbSchema";

function Hello() {
  return (
    <div>
      <div>hellooo222ooa</div>
      <button
        onClick={() => {
          const data: ISchemaA[] = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" },
          ];
          window.eapi.writeFile(data);
        }}
      >
        Save something
      </button>
      <button
        onClick={() => {
          window.eapi.dbRead((data) => {
            console.log("Got this back from db");
            console.dir(data);
          });
        }}
      >
        Read something
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}

const rootContainer = document.getElementById("root");

if (rootContainer) {
  const root = createRoot(rootContainer);
  root.render(<App />);
} else {
  console.error(`broken html, cannot find root`);
}
