import React from "react";
import { isEmpty } from "lodash";
import { formatOverviewChart } from "utils";
import { Bar } from "react-chartjs-2";

export default function ChartPriceOverview(props) {
  const { total_volumes } = props;
  // Exclude 31st element which corresponds to ... average?
  const data = {
    datasets: [
      {
        data: total_volumes.filter((item, index, array) => index !== array.length - 1).map(formatOverviewChart),
        borderColor: "#2172e5",
        fill: true,
        backgroundColor: "#2172e5"
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

  return <>{!isEmpty(total_volumes) && <Bar data={data} options={options} />}</>;
}
