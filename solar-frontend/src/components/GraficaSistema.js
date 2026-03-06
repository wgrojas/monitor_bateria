import React from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function GraficaSistema({ datos }) {

  // Ordenamos los datos por fecha de menor a mayor
  const datosOrdenados = [...datos].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );

  const labels = datosOrdenados.map(d =>
    new Date(d.fecha).toLocaleTimeString("es-CO")
  );

  const voltaje = datosOrdenados.map(d => d.voltaje);
  const corriente = datosOrdenados.map(d => d.corriente);

  // Función para color de voltaje
  const colorVoltaje = (v) => {
    if (v >= 12) return "green";
    else if (v >= 11) return "orange";
    else return "red";
  };

  // Función para color de corriente
  const colorCorriente = (c) => {
    if (c <= 10) return "blue"; // normal
    else return "red"; // fuera de rango
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Voltaje (V)",
        data: voltaje,
        borderColor: voltaje.map(v => colorVoltaje(v)),
        backgroundColor: voltaje.map(v => {
          const c = colorVoltaje(v);
          return c === "green"
            ? "rgba(0,255,0,0.2)"
            : c === "orange"
            ? "rgba(255,165,0,0.2)"
            : "rgba(255,0,0,0.2)";
        }),
        tension: 0.4,
        fill: true,
        yAxisID: 'yDerecha'
      },
      {
        label: "Corriente (A)",
        data: corriente,
        borderColor: corriente.map(c => colorCorriente(c)),
        backgroundColor: corriente.map(c => {
          const col = colorCorriente(c);
          return col === "blue" ? "rgba(0,0,255,0.2)" : "rgba(255,0,0,0.2)";
        }),
        tension: 0.4,
        fill: true,
        yAxisID: 'yDerecha'
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        ticks: {
          align: 'end',
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      yDerecha: {
        position: 'right',
        min: 1,   // límite inferior
        max: 15,  // límite superior
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    }
  };

  return (
    <div className="card p-3">
      <h5>📊 Monitoreo del sistema solar</h5>
      <Line data={data} options={options} />
    </div>
  );
}

export default GraficaSistema;