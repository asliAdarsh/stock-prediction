"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./stchart.css"

export default function StockChart({ data, prediction }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Sort data by date (oldest to newest)
    const sortedData = [...data].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Prepare data for chart
    const labels = sortedData.map(item => item.date);
    const prices = sortedData.map(item => item.price);

    // Create datasets
    const datasets = [
      {
        label: 'Historical Prices',
        data: prices,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false
      }
    ];

    // Add prediction point if available
    if (prediction !== null && sortedData.length > 0) {
      // Create a new date for prediction (one day after the last date)
      const lastDate = new Date(sortedData[sortedData.length - 1].date);
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + 1);
      
      // Format the date as YYYY-MM-DD
      const nextDateStr = nextDate.toISOString().split('T')[0];
      
      // Add prediction dataset
      datasets.push({
        label: 'Prediction',
        data: [...Array(labels.length - 1).fill(null), prices[prices.length - 1], prediction],
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5],
        pointRadius: [0, 0, 0, 0, 0, 5],
        tension: 0.1,
        fill: false
      });
      
      // Add the prediction date to labels
      labels.push(nextDateStr);
    }

    // Create chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets
        },
        options: {
          responsive: true,
          scales: {
            y: {
              title: {
                display: true,
                text: 'Price ($)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            }
          },
          plugins: {
            tooltip: {
              mode: 'index',
              intersect: false
            },
            legend: {
              position: 'top',
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, prediction]);

  return (
    <div className="w-full h-full min-h-[300px]">
      {data.length > 0 ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No data to display</p>
        </div>
      )}
    </div>
  );
}