import React from "react";
import { Bar } from "react-chartjs-2";
import { formatOverviewChart } from "utils";
import { ChartDiv } from "styled";

export default function ChartPriceOverview(props) {
  const { totalVolumes } = props;
  // Exclude 31st element which corresponds to ... average?
  const data = {
    datasets: [
      {
        data: totalVolumes.map(formatOverviewChart),
        borderColor: "#2172e5",
        fill: true,
        backgroundColor: "#2172e5",
      },
    ],
  };
  const options = {
    layout: {
      padding: { top: 30, right: 20, left: 25, bottom: 10 },
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
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#c6c7ce",
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
    <ChartDiv>
      {!!totalVolumes.length && <Bar data={data} options={options} />}
    </ChartDiv>
  );
}
