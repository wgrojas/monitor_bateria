import React from "react";
import "./Battery.css";

const Battery = ({ voltage }) => {

  const v = Number(voltage) || 0;

  // Calcular porcentaje batería
  let percent = ((v - 9) / (12.6 - 9)) * 100;

  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  percent = percent.toFixed(0);

  let color = "red";

  if (v >= 12) color = "green";
  else if (v >= 11) color = "orange";
  else color = "red";

  return (

    <div className="battery-wrapper">

      <div className="battery">

        <div
          className="battery-level"
          style={{
            width: percent + "%",
            backgroundColor: color
          }}
        />

        <div className="battery-percent">
          {percent}%
        </div>

      </div>

      <h4 className="battery-text">
        🔋 {v} V
      </h4>

    </div>

  );
};

export default Battery;