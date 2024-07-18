import React from "react";
import { VictoryPie, VictoryTooltip, VictoryContainer } from "victory";

const PieChart = ({ filteredData }) => {
  // Aggregate data by tag
  const aggregateDataByTag = (filteredData) => {
    return filteredData.reduce((acc, transaction) => {
      const tagIndex = acc.findIndex(item => item.x === transaction.tag);
      const amount = parseFloat(transaction.y); // Convert amount to number
      if (tagIndex !== -1) {
        acc[tagIndex].y += amount;
      } else {
        acc.push({ x: transaction.tag, y: amount });
      }
      return acc;
    }, []);
  };
  

  const aggregatedData = aggregateDataByTag(filteredData);

  console.log("Aggregated Data", aggregatedData);

  // Calculate total amount
  const totalAmount = aggregatedData.reduce((sum, entry) => sum + entry.y, 0);

  // Generate color scheme
  const colorScheme = [
    "#2970ff",
    "#00bfff",
    "#ff6347",
    "#ff1493",
    "#32cd32",
    "#ff4500",
  ];

  const tagColorMap = aggregatedData.reduce((map, entry, index) => {
    map[entry.x] = colorScheme[index % colorScheme.length];
    return map;
  }, {});

  return (
    <div className="pie-wrapper">
      <div className="pie-chart">
        <VictoryPie
          data={aggregatedData}
          x="x"
          y="y"
          colorScale={colorScheme} // Color scheme for pie slices
          labels={({ datum }) =>
            `${datum.x}: ${((datum.y / totalAmount) * 100).toFixed(2)}%`
          }
          labelComponent={<VictoryTooltip />}
          containerComponent={<VictoryContainer responsive={false} />}
        />
      </div>
      <div className="details-wrapper">
        {aggregatedData.map((data, index) => (
          <div key={data.x} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: tagColorMap[data.x] }}
            ></span>
            <span className="legend-text">{data.x}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
