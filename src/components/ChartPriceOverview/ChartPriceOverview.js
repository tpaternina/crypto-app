import React from "react";
import { isEmpty } from "lodash";
import { formatOverviewChart } from "utils";
import { Line } from "react-chartjs-2";

export default function ChartPriceOverview(props) {
  const { prices } = props;
  // Whether coin price increased the last 30 days
  // Exclude 31st element which corresponds to ... average?
  const increase = !isEmpty(prices) && prices[29][1] - prices[0][1] > 0;

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 230);

    // Add three color stops
    gradient.addColorStop(0, increase ? "#007113" : "#81011b");
    gradient.addColorStop(1, "#191b1f");

    return {
      datasets: [
        {
          data: prices
            .filter((item, index, array) => index !== array.length - 1)
            .map(formatOverviewChart),
          borderWidth: 1,
          borderColor: increase ? "#00fc2a" : "#fe1040",
          fill: true,
          backgroundColor: gradient,
        },
      ],
    };
  };
  
  const options = {
    layout: {
      padding: 16,
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

  return <>{!isEmpty(prices) && <Line data={data} options={options} />}</>;
}
