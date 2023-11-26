import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function BarGraph() {
  const [data,setdata]=useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/admin/sales');
        setdata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className=" bg-white p-4 rounded border ">
      <strong className="">Sales</strong>
      <div className="mt-3">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3 0 0" />
          <XAxis dataKey="name"  vertical={false} />
          <YAxis domain={[0, 20]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Sales" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  )
}
