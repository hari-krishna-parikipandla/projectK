import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import StudentData from "../../data/studentsData.js";

const StudentChart = () => {
  return (
    <BarChart width={600} height={300} data={StudentData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" fill="#8884d8" />
      <Bar dataKey="pv" fill="#82ca9d" />
    </BarChart>
  );
};

export default StudentChart;
