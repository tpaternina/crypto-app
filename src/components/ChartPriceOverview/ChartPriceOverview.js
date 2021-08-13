import React from "react";
import gradient from "chartjs-plugin-gradient";
import { Line } from "react-chartjs-2";
import { formatOverviewChart } from "utils";
import { ChartDiv } from "styled";

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
              0: "#00fc2a00",
              100: "#00fc2a77",
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
      //padding: { top: 10, right: 15, left: 5 },
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
      {!!prices.length && <Line data={data} options={options} plugins={[{gradient}]} />}
    </ChartDiv>
  );
}
