import React from "react";
import { Line } from "react-chartjs-2";

export default function Chart(props) {
  const yAxisMax = Math.max(...props.data);
  const yAxisMin = Math.min(...props.data);

  const data = {
    labels: props.data,
    datasets: [
      {
        data: props.data,
        borderColor: props.increase ? "#00fc2a" : "#fe1040",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    layout: {
      padding: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        min: yAxisMin,
        max: yAxisMax,
        display: false,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
  };
  return <Line height={50} data={data} options={options} />;
}
