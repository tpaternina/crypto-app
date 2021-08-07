import React from "react";
import { formatOverviewChart } from "utils";
import { Bar } from "react-chartjs-2";

export default function ChartPriceOverview(props) {
  const { totalVolumes } = props;
  // Exclude 31st element which corresponds to ... average?
  const data = {
    datasets: [
      {
        data: totalVolumes
          .filter((item, index, array) => index !== array.length - 1)
          .map(formatOverviewChart),
        borderColor: "#2172e5",
        fill: true,
        backgroundColor: "#2172e5",
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
      {!!totalVolumes.length && <Bar data={data} options={options} />}
    </div>
  );
}
