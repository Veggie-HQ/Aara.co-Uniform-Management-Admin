import React from "react";
import { Box } from "@chakra-ui/react";
import { LineChart, Line } from "recharts";

const BarChart = () => {
  const data = [
    { name: "Page A", uv: 150, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 1300, amt: 1300 },
    { name: "Page B", uv: 350, pv: 2000, amt: 2000 },
    { name: "Page B", uv: 200, pv: 1300, amt: 1300 },
    { name: "Page B", uv: 100, pv: 1300, amt: 1300 },
    { name: "Page B", uv: 110, pv: 1300, amt: 1300 },
  ];
  return (
    <>
      <Box width="97%" border="1px solid orange">
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </Box>
    </>
  );
};

export default BarChart;
