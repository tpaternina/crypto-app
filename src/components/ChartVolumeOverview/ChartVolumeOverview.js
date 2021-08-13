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
      //padding: { top: 50, right: 25, left: 25 },
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
            size: 12,
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
    <ChartDiv>
      {!!totalVolumes.length && <Bar data={data} options={options} />}
    </ChartDiv>
  );
}
