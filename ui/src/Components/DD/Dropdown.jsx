import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Dropdown(props) {
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    if (props.reset) {
      setSelectedValues([]);
    }
  }, [props.reset]);

  const handleCheckboxChange = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    props.onCheckboxChange(newSelectedValues);
  };

  return (
    <>
      <Accordion
        defaultExpanded
        className="row"
        style={{ backgroundColor: "#171c28", color: "white" }}
      >
        <AccordionSummary
          className="col-12"
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>{props.data.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {props.data.value.map((value, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedValues.includes(value)}
                    onChange={() => handleCheckboxChange(value)}
                  />
                }
                label={value}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <hr />
    </>
  );
}
