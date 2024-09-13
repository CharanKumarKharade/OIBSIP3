import { useState, useEffect } from "react";

export default function App() {
  const [temperature, setTemperature] = useState("");
  const [fromUnit, setFromUnit] = useState("Celsius");
  const [toUnit, setToUnit] = useState("Celsius");
  const [result, setResult] = useState(null);
  const [conversionCompleted, setConversionCompleted] = useState(false);

  // Reset conversionCompleted when temperature is updated
  useEffect(() => {
    if (temperature !== "") {
      setConversionCompleted(false);
    }
  }, [temperature]);

  const handleConvert = () => {
    let temp = parseFloat(temperature);
    if (isNaN(temp)) return;

    let convertedTemp;
    // Conversion logic
    if (fromUnit === "Celsius") {
      if (toUnit === "Fahrenheit") {
        convertedTemp = (temp * 9) / 5 + 32;
      } else if (toUnit === "Kelvin") {
        convertedTemp = temp + 273.15;
      } else {
        convertedTemp = temp;
      }
    } else if (fromUnit === "Fahrenheit") {
      if (toUnit === "Celsius") {
        convertedTemp = ((temp - 32) * 5) / 9;
      } else if (toUnit === "Kelvin") {
        convertedTemp = ((temp - 32) * 5) / 9 + 273.15;
      } else {
        convertedTemp = temp;
      }
    } else if (fromUnit === "Kelvin") {
      if (toUnit === "Celsius") {
        convertedTemp = temp - 273.15;
      } else if (toUnit === "Fahrenheit") {
        convertedTemp = ((temp - 273.15) * 9) / 5 + 32;
      } else {
        convertedTemp = temp;
      }
    }

    setResult(convertedTemp.toFixed(2));
    setConversionCompleted(true); // Lock the radio buttons
  };

  const handleRadioChange = (unit, type) => {
    if (!conversionCompleted) {
      if (type === "from") {
        setFromUnit(unit);
      } else if (type === "to") {
        setToUnit(unit);
      }
    }
  };

  return (
    <div className="flex justify-center h-[607px] bg-gray-800">
      <div className="text-center m-5 w-1/2 bg-gray-500 p-4 rounded-lg">
        <h1 className="text-xl mt-3 font-serif font-bold">
          Temperature Converter
        </h1>
        <div>
          <input
            type="number"
            className="w-[50%] m-2 rounded-lg p-1 text-center"
            placeholder="Enter the temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
          <div className="flex justify-around">
            <div>
              <h3>From</h3>
              {["Celsius", "Fahrenheit", "Kelvin"].map((unit) => (
                <div key={unit}>
                  <input
                    type="radio"
                    id={`from-${unit}`}
                    name="from"
                    checked={fromUnit === unit}
                    onChange={() => handleRadioChange(unit, "from")}
                    disabled={conversionCompleted} // Disable if conversion is completed
                  />
                  <label className="text-xl px-1" htmlFor={`from-${unit}`}>
                    {unit}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <h3>To</h3>
              {["Celsius", "Fahrenheit", "Kelvin"].map((unit) => (
                <div key={unit}>
                  <input
                    type="radio"
                    id={`to-${unit}`}
                    name="to"
                    checked={toUnit === unit}
                    onChange={() => handleRadioChange(unit, "to")}
                    disabled={conversionCompleted} // Disable if conversion is completed
                  />
                  <label className="text-xl px-1" htmlFor={`to-${unit}`}>
                    {unit}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button
              className="px-5 py-2 rounded-md bg-blue-500 text-white"
              onClick={handleConvert}
            >
              Convert
            </button>
          </div>
          {result !== null && (
            <div className="mt-4 text-xl">
              <p>
                Converted Temperature: {result} {toUnit}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
