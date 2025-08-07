import React from "react";
import Clock from "../../../Admin/pages/Clock";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ customerData = {}, totals = {}, setTabview }) {
  const chartData = [
    {
  name: "Sher",
  Approved: totals?.approvedSher || 0,
  Pending: totals?.pendingSher || 0,
},
    {
      name: "Shayari",
      Approved: totals?.approvedShayari || 0,
      Pending: totals?.pendingShayari || 0,
    },
    {
  name: "Prose",
  Approved: totals?.approvedProse || 0,
  Pending: totals?.pendingProse || 0,
},
  ];

  const cardData = [
    { title: "Total Sher", count: totals?.sher || 0, color: "primary", tab: 7 },
    { title: "Pending Sher", count: totals?.pendingSher || 0, color: "warning", tab: 7 },
    { title: "Approved Sher", count: totals?.approvedSher || 0, color: "success", tab: 7 },

    { title: "Total Shayari", count: totals?.shayari || 0, color: "primary", tab: 8 },
    { title: "Pending Shayari", count: totals?.pendingShayari || 0, color: "warning", tab: 8 },
    { title: "Approved Shayari", count: totals?.approvedShayari || 0, color: "success", tab: 8 },

    { title: "Total Prose", count: totals?.prose || 0, color: "primary", tab: 9 },
    { title: "Pending Prose", count: totals?.pendingProse || 0, color: "warning", tab: 9 },
    { title: "Approved Prose", count: totals?.approvedProse || 0, color: "success", tab: 9 },

  ];

  return (
    <>
      <style>{`
        .summary-card {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.08);
          transition: transform 0.2s ease-in-out;
        }

        .summary-card:hover {
          transform: translateY(-5px);
        }

        .summary-card .top {
          color: white;
          padding: 20px;
          font-size: 18px;
          text-align: center;
          font-weight: bold;
        }

        .summary-card .number {
          font-size: 30px;
          margin-bottom: 5px;
        }

        .summary-card .bottom {
          background-color: #f8f9fa;
          text-align: center;
          padding: 10px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          font-weight: 500;
        }

        .summary-card .bottom:hover {
          background-color: #e9ecef;
        }
      `}</style>

      <div className="container-fluid">
        {/* Header */}
        <div className="row mt-3 align-items-center">
          <div className="col-md-6 col-12">
            <Clock />
          </div>
          <div className="col-md-6 col-12 text-md-end text-center">
            <h2 className="fw-bold">
              Welcome, <span className="text-primary">{customerData?.name || "User"}</span>
            </h2>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="row my-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white fw-semibold">
                Content Overview (Approved vs Pending)
              </div>
              <div className="card-body">
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Approved" fill="#4CAF50" stackId="a" />
                      <Bar dataKey="Pending" fill="#f44336" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row">
          {cardData.map((item, i) => {
            const bgColorMap = {
              primary: "#1D4E89",
              warning: "#F9A825",
              success: "#43A047",
              danger: "#EF5350",
            };

            const bg = bgColorMap[item.color] || "#007bff";

            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                <div className="summary-card">
                  <div className="top" style={{ backgroundColor: bg }}>
                    <div className="number">{item.count}</div>
                    {item.title.toUpperCase()}
                  </div>
                  <div className="bottom" onClick={() => setTabview(item.tab)}>
                    VIEW ALL →
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
