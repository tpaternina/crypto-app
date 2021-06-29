import React from "react";
import { isEmpty } from "lodash";
import { formatOverviewChart } from "utils";
import { Line } from "react-chartjs-2";

export default function ChartPriceOverview(props) {
  const { prices } = props;
  // Whether coin price increased the last 30 days
  // Exclude 31st element which corresponds to ... average?
  const increase = !isEmpty(prices) && prices[29][1] - prices[0][1] > 0;
  const data = {
    datasets: [
      {
        data: prices.map((item, index, array) => {
          if (index !== array.length - 1) {
            return formatOverviewChart(item);
          }
        }),
        borderColor: increase ? "#00fc2a" : "#fe1040",
        fill: true,
        backgroundColor: increase ? "#00fc2a44" : "#fe104044"
      },
    ],
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
        backgroundColor: increase ? "#00fc2a" : "#fe1040",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 16
          }
        }
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
