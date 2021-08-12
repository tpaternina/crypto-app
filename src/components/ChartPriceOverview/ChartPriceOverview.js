import React from "react";
import gradient from "chartjs-plugin-gradient";
import { formatOverviewChart } from "utils";
import { Line } from "react-chartjs-2";

export default function ChartPriceOverview(props) {
  const { prices } = props;
  // Whether coin price increased the last 30 days
  // Exclude 31st element which corresponds to ... average?
  const increase = !!prices.length && prices[29][1] - prices[0][1] > 0;

  const data = {
    datasets: [
      {
        data: prices
          .filter((item, index, array) => index !== array.length - 1)
          .map(formatOverviewChart),
        gradient: {
          backgroundColor: {
            axis: "y",
            colors: {
              0: "red",
              50: "yellow",
              100: "green",
            },
          },
        },
        borderWidth: 1,
        borderColor: increase ? "#00fc2a" : "#fe1040",
        fill: true,
      },
    ],
  };

  const options = {
    layout: {
      padding: { top: 50, right: 25, left: 25 },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      gradient,
    },
    elements: {
      point: {
        radius: 0,
        backgroundColor: increase ? "#00fc2aff" : "#fe1040ff",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 16,
          },
        },
      },
      y: {
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

  return (
    <div className="chart">
      {!!prices.length && <Line data={data} options={options} />}
    </div>
  );
}
