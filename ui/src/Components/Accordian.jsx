import React, { useState, useEffect } from "react";
import Card from "./Card";
import Dropdown from "./DD/Dropdown";

const YourComponent = () => {
  const location = {
    name: "Location",
    value: ["Bengaluru", "Chennai", "Coimbatore", "Mumbai"],
  };
  const company = {
    name: "Company",
    value: ["Amazon", "BMW", "Incresco", "Apple Incorporations"],
  };
  const datePosted = {
    name: "Date Posted",
    value: [
      "Last 24 hours",
      "Last 48 hours",
      "Last 7 days",
      "Last 14 days",
      "Last month",
    ],
  };
  const salary = {
    name: "Salary Range (in Lakh+)",
    value: ["300000", "600000", "1000000", "1500000", "2500000"],
  };
  const skills = {
    name: "Skills",
    value: [
      "Javascript",
      "Machine Learning",
      "JQuery",
      "Artificial Intelligence",
    ],
  };
  const education = {
    name: "Education",
    value: ["Bachelors", "Masters", "PhD", "Diplomo"],
  };
  const exp = {
    name: "Experience (Years)",
    value: ["0-2", "3-5", "6-8", "9-11"],
  };
  // Sample data for cards
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the URL with selected filters
        const queryString = Object.keys(selectedFilters)
          .map((key) => {
            if (JSON.stringify(selectedFilters[key]) != []) {
              return `${key}=${JSON.stringify(selectedFilters[key])}`;
            }
          })
          .join("&");
        const response = await fetch(
          `http://localhost:3000/job?${queryString}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilters]);

  const handleCheckboxChange = (filterName, selectedValues) => {
    const newSelectedFilters = {
      ...selectedFilters,
      [filterName]: selectedValues,
    };

    // Remove the filter key if its value is empty
    if (selectedValues.length === 0) {
      delete newSelectedFilters[filterName];
    }
    setSelectedFilters(newSelectedFilters);
    setSelectedCount(Object.values(newSelectedFilters).flat().length);
  };

  const [clearAllFilters, setClearAllFilters] = useState(false);

  const handleClearFilters = () => {
    setSelectedFilters({});
    setClearAllFilters(!clearAllFilters);
  };

  return (
    <div style={{ minHeight: "100vh", color: "white" }}>
      <div className="container">
        <div className="row mt-2">
          {/* Left side with filters */}
          <div className="col-md-4">
            <div className="row">
              <p className="col-3">Filters</p>
              <p
                className="col-9 d-flex justify-content-end"
                onClick={handleClearFilters}
                style={{ cursor: "pointer" }}
              >
                Clear filters
              </p>
            </div>
            <hr />
            <Dropdown
              data={company}
              onCheckboxChange={(selectedValues) =>
                handleCheckboxChange("companyName", selectedValues)
              }
              reset={clearAllFilters}
            />
            <Dropdown
              data={location}
              onCheckboxChange={(selectedValues) =>
                handleCheckboxChange("location", selectedValues)
              }
              reset={clearAllFilters}
            />
            <Dropdown
              data={datePosted}
              onCheckboxChange={(selectedValues) =>
                handleCheckboxChange("postedOn", selectedValues)
              }
              reset={clearAllFilters}
            />
            <Dropdown
              data={salary}
              onCheckboxChange={(selectedValues) =>
                handleCheckboxChange("salary", selectedValues)
              }
              reset={clearAllFilters}
            />
            <Dropdown
              data={skills}
              onCheckboxChange={(selectedValues) =>
                handleCheckboxChange("skills", selectedValues)
              }
              reset={clearAllFilters}
            />
            <Dropdown
              data={exp}
              onCheckboxChange={(selectedValues) =>
                handleCheckboxChange("experience", selectedValues)
              }
              reset={clearAllFilters}
            />
            <Dropdown
              data={education}
              onCheckboxChange={(selectedValues) =>
                handleCheckboxChange("education", selectedValues)
              }
              reset={clearAllFilters}
            />
          </div>

          {/* Right side with cards */}
          <div className="col-md-8">
            <h2>{data.length} Jobs Available</h2>
            <div className="row">
              {loading ? (
                <p>{data.message}</p>
              ) : (
                data.map((item) => (
                  <Card
                    key={item.id}
                    data={item}
                    style={{ marginBottom: 16 }}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
