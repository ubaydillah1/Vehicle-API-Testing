import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactJson from "react-json-view";

function App() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleApiCall(apiCall) {
    try {
      setIsLoading(true);
      const response = await apiCall();
      setContent(response.data);
    } catch (error) {
      console.log(error);
      setContent(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSpecification = () =>
    handleApiCall(() =>
      axios.get(
        "https://specifications.vinaudit.com/v3/specifications?key=II3PYLMDJBUK8ZP&format=json&include=attributes,equipment,colors,recalls,warrantiess&vin=WBS8M9C52J5J78248&country=canada"
      )
    );

  const handleMarketValue = () =>
    handleApiCall(() =>
      axios.get(
        "https://marketvalue.vinaudit.com/v2/marketvalue?key=II3PYLMDJBUK8ZP&format=json&vin=WP0AB29977S731311&country=canada"
      )
    );

  const handleMarketValueByQuery = () =>
    handleApiCall(() =>
      axios.get(
        "http://marketvalue.vinaudit.com/v2/marketvalue?key=II3PYLMDJBUK8ZP&&format=json&period=90&mileage=average&year=2018&make=bmw&model=m3&trim=base&country=canada"
      )
    );

  const handleHistory = () =>
    handleApiCall(() =>
      axios.get(
        "http://api.vinaudit.com/v2/pullreport?format=xml&key=II3PYLMDJBUK8ZP&user=griffin@straightdeal.com&pass=LR0Jk0eTknMmRD&mode=prod&vin=5TFUY5F15BX205992&country=canada"
      )
    );

  return (
    <div style={{ padding: "100px" }}>
      <div className="actions">
        <button onClick={handleSpecification} disabled={isLoading}>
          Get Specification
        </button>
        <button onClick={handleMarketValue} disabled={isLoading}>
          Get Market Value
        </button>
        <button onClick={handleMarketValueByQuery} disabled={isLoading}>
          Get Market Value with query
        </button>
        <button
          onClick={handleHistory}
          style={{ background: "red" }}
          disabled={isLoading}
        >
          Get History Report (LIMIT)
        </button>
      </div>

      {isLoading ? (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="json-container">
          {content ? (
            <>
              <div className="x" onClick={() => setContent("")}>
                X
              </div>
              <ReactJson
                src={content}
                theme="monokai"
                iconStyle="circle"
                displayDataTypes={false}
                collapsed={2}
              />
            </>
          ) : (
            <p>No data to display</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
