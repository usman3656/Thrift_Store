import React, { useEffect, useState } from 'react'
import PieChartData from '../../utils/pieChart'
import { PieChart, Pie, Cell, Legend } from 'recharts'
import axios from 'axios'

// const data=PieChartData;
const RADIAN = Math.PI / 180
const COLORS = ['#14b8a6', '#0f766e', '#059669']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5
	const x = cx + radius * Math.cos(-midAngle * RADIAN)
	const y = cy + radius * Math.sin(-midAngle * RADIAN)

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	)
}

export default function PieCHart() {

	const[data,setData]=useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('/admin/productStats');
            setData(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchProducts();
      }, []);
  return (
    <div className="bg-white p-4 border">
      <strong className="text-gray-700">Products</strong>
      <div className="mt-3 w-full flex-1 text-xs">
		<PieChart width={400} height={300}>
			<Pie
				data={data}
				cx="50%"
				cy="45%"
				labelLine={false}
				label={renderCustomizedLabel}
				outerRadius={105}
				fill="#8884d8"
				dataKey="value"
			>
				{data.map((_, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Legend />
		</PieChart>
      </div>
    </div>
  )
}