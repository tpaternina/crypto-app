import React from "react";
//import gradient from "chartjs-plugin-gradient";
import { Line } from "react-chartjs-2";
import { formatOverviewChart } from "utils";
import { ChartDiv } from "styles";

export default function ChartPriceOverview(props) {
  const { prices, padding } = props;
  let { chartColor } = props;

  // Whether coin price increased in the last `timeRange`
  const increase =
    !!prices.length && prices[prices.length - 1][1] >= prices[0][1];

  chartColor = chartColor || (increase ? "#00fc2a" : "#fe1040");

  const data = {
    datasets: [
      {
        data: prices.map(formatOverviewChart),
        borderWidth: 1,
        borderColor: chartColor,
        fill: true,
      },
    ],
  };

  const gradient = {
    id: "responsiveGradient",

    afterLayout: function (chart, options) {
      const { scales } = chart;

      // create a linear gradient with the dimensions of the scale
      const color = chart.ctx.createLinearGradient(
        scales["x"].left,
        scales["y"].bottom,
        scales["x"].left,
        scales["y"].top
      );
      // add gradients stops
      color.addColorStop(0, "#00000000");
      color.addColorStop(1, chartColor + "77");
      // changes the background color option
      chart.data.datasets[0].backgroundColor = color;
    },
  };

  const options = {
    layout: {
      padding: padding || { top: 67.2, right: 32, left: 32, bottom: 16 },
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
        radius: 2,
        backgroundColor: chartColor
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
      {!!prices.length && (
        <Line data={data} options={options} plugins={[gradient]} />
      )}
    </ChartDiv>
  );
}
