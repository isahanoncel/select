import { useState } from "react";
import { Select } from "./components";

const options = [
  { label: "Education 🎓", value: "education" },
  { label: "Yeeeah, science! 🔬", value: "science" },
  { label: "Art 🎨", value: "art" },
  { label: "Sport ⚽", value: "sport" },
  { label: "Games 🎮", value: "games" },
  { label: "Health 🏥", value: "health" },
];

function App() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div>
      <Select
        options={options}
        value={selectedOptions}
        onChange={setSelectedOptions}
        placeholder="Select a category..."
      />
    </div>
  );
}

export default App;
