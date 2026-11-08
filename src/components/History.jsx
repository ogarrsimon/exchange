
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const chartData = {
  "1D": [
    { date: "09:00", rate: 0.8508 },
    { date: "10:00", rate: 0.8517 },
    { date: "11:00", rate: 0.8509 },
    { date: "12:00", rate: 0.8521 },
    { date: "13:00", rate: 0.8515 },
    { date: "14:00", rate: 0.8530 },
    { date: "15:00", rate: 0.8524 },
    { date: "16:00", rate: 0.8530 },
  ],
  "1W": [
    { date: "Mon", rate: 0.8498 },
    { date: "Tue", rate: 0.8512 },
    { date: "Wed", rate: 0.8504 },
    { date: "Thu", rate: 0.8487 },
    { date: "Fri", rate: 0.8520 },
    { date: "Sat", rate: 0.8515 },
    { date: "Sun", rate: 0.8530 },
  ],
  "1M": [
    { date: "Apr 14", rate: 0.8524 },
    { date: "Apr 15", rate: 0.8560 },
    { date: "Apr 16", rate: 0.8585 },
    { date: "Apr 17", rate: 0.8558 },
    { date: "Apr 18", rate: 0.8565 },
    { date: "Apr 19", rate: 0.8559 },
    { date: "Apr 20", rate: 0.8530 },
    { date: "Apr 21", rate: 0.8532 },
    { date: "Apr 22", rate: 0.8490 },
    { date: "Apr 23", rate: 0.8500 },
    { date: "Apr 24", rate: 0.8510 },
    { date: "Apr 25", rate: 0.8520 },
    { date: "Apr 26", rate: 0.8510 },
    { date: "Apr 27", rate: 0.8475 },
    { date: "Apr 28", rate: 0.8455 },
    { date: "Apr 29", rate: 0.8480 },
    { date: "Apr 30", rate: 0.8510 },
    { date: "May 01", rate: 0.8495 },
    { date: "May 02", rate: 0.8510 },
    { date: "May 03", rate: 0.8505 },
    { date: "May 04", rate: 0.8550 },
    { date: "May 05", rate: 0.8575 },
    { date: "May 06", rate: 0.8610 },
    { date: "May 07", rate: 0.8540 },
    { date: "May 08", rate: 0.8500 },
    { date: "May 09", rate: 0.8490 },
    { date: "May 10", rate: 0.8520 },
    { date: "May 11", rate: 0.8580 },
    { date: "May 12", rate: 0.8560 },
    { date: "May 13", rate: 0.8590 },
    { date: "May 14", rate: 0.8530 },
  ],
  "3M": [
    { date: "Feb", rate: 0.8420 },
    { date: "Feb 10", rate: 0.8460 },
    { date: "Feb 20", rate: 0.8390 },
    { date: "Mar", rate: 0.8510 },
    { date: "Mar 10", rate: 0.8470 },
    { date: "Mar 20", rate: 0.8550 },
    { date: "Apr", rate: 0.8490 },
    { date: "Apr 10", rate: 0.8520 },
    { date: "Apr 20", rate: 0.8455 },
    { date: "May", rate: 0.8530 },
    { date: "May 14", rate: 0.8530 },
  ],
  "1Y": [
    { date: "Jun", rate: 0.8350 },
    { date: "Jul", rate: 0.8420 },
    { date: "Aug", rate: 0.8290 },
    { date: "Sep", rate: 0.8470 },
    { date: "Oct", rate: 0.8510 },
    { date: "Nov", rate: 0.8390 },
    { date: "Dec", rate: 0.8450 },
    { date: "Jan", rate: 0.8380 },
    { date: "Feb", rate: 0.8460 },
    { date: "Mar", rate: 0.8490 },
    { date: "Apr", rate: 0.8455 },
    { date: "May", rate: 0.8530 },
  ],
  "5Y": [
    { date: "2022", rate: 0.8820 },
    { date: "2022", rate: 0.8650 },
    { date: "2023", rate: 0.8790 },
    { date: "2023", rate: 0.8580 },
    { date: "2024", rate: 0.8910 },
    { date: "2024", rate: 0.8670 },
    { date: "2025", rate: 0.8420 },
    { date: "2025", rate: 0.8550 },
    { date: "2026", rate: 0.8455 },
    { date: "2026", rate: 0.8530 },
  ],
};

const timeframes = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

const stats = [
  { label: "OPEN", value: "0.8516", color: "text-white" },
  { label: "LAST", value: "0.8530", color: "text-white" },
  { label: "CHANGE", value: "+0.0014", color: "text-[#39D353]" },
  { label: "% CHANGE", value: "▲ +0.16%", color: "text-[#39D353]" },
];

function StatCard({ label, value, color }) {
  return (
    <div className="min-w-0 flex-1 rounded-2xl border border-[#202022] bg-[#171719] px-4 py-4 sm:px-5">
      <p className="mb-3 font-mono text-xs tracking-[0.15em] text-[#A3A3A3]">
        {label}
      </p>
      <p className={`whitespace-nowrap font-mono text-lg ${color}`}>
        {value}
      </p>
    </div>
  );
}

export default function History() {
  const [activeTab, setActiveTab] = useState("HISTORY");
  const [timeframe, setTimeframe] = useState("1M");

  const data = chartData[timeframe];
  const firstRate = data[0].rate;
  const lastRate = data[data.length - 1].rate;
  const change = lastRate - firstRate;
  const percentChange = (change / firstRate) * 100;

  return (
    <section className="w-full space-y-5 bg-[#0A0A0A] text-white">
      {/* Navigation tabs */}
      {/* <div className="flex gap-6 overflow-x-auto border-b border-[#292929] sm:gap-8">
        {[
          { label: "HISTORY" },
          { label: "COMPARE" },
          { label: "FAVORITES", count: 10 },
          { label: "LOG", count: 8 },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-1 pb-3 font-mono text-xs tracking-[0.12em] transition sm:text-sm ${
              activeTab === tab.label
                ? "border-[#CEF739] text-white"
                : "border-transparent text-[#A3A3A3] hover:text-white"
            }`}
          >
            {tab.label}
            {tab.count && (
              <span className="rounded-full bg-[#CEF739]/15 px-1.5 py-0.5 text-[10px] text-[#CEF739]">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div> */}

      {activeTab !== "HISTORY" ? (
        <div className="rounded-2xl border border-[#292929] bg-[#171719] p-8 text-center">
          <p className="font-mono text-sm text-[#A3A3A3]">
            {activeTab} content can be added here.
          </p>
        </div>
      ) : (
        <>
          {/* Statistics and timeframe selector */}
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="OPEN" value="0.8516" color="text-white" />
              <StatCard label="LAST" value="0.8530" color="text-white" />
              <StatCard
                label="CHANGE"
                value={`${change >= 0 ? "+" : ""}${change.toFixed(4)}`}
                color={change >= 0 ? "text-[#39D353]" : "text-red-400"}
              />
              <StatCard
                label="% CHANGE"
                value={`${change >= 0 ? "▲ +" : "▼ "}${percentChange.toFixed(2)}%`}
                color={change >= 0 ? "text-[#39D353]" : "text-red-400"}
              />
            </div>

            <div className="flex w-fit items-center gap-1 rounded-xl bg-[#171719] p-1">
              {timeframes.map((item) => (
                <button
                  key={item}
                  onClick={() => setTimeframe(item)}
                  className={`rounded-lg px-3 py-3 font-mono text-[10px] transition sm:px-4 ${
                    timeframe === item
                      ? "bg-[#292929] text-[#CEF739]"
                      : "text-[#A3A3A3] hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Chart panel */}
          <div className="rounded-2xl border border-[#292929] bg-[#171719] p-4 sm:p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-mono text-sm font-bold tracking-wider">
                USD/EUR
              </h3>

              <div className="font-mono text-[10px] tracking-wider text-[#A3A3A3] sm:text-xs">
                {lastRate.toFixed(4)} <span className="mx-2">•</span>{" "}
                {timeframe} VIEW
              </div>
            </div>

            <div className="h-[260px] w-full sm:h-[310px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 5, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="limeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#CEF739"
                        stopOpacity={0.55}
                      />
                      <stop
                        offset="95%"
                        stopColor="#CEF739"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#292929"
                    strokeDasharray="2 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#737373", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={30}
                    tickMargin={12}
                  />

                  <YAxis
                    domain={["dataMin - 0.002", "dataMax + 0.002"]}
                    tick={{ fill: "#737373", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => value.toFixed(4)}
                    width={48}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111111",
                      border: "1px solid #292929",
                      borderRadius: "10px",
                      color: "#F5F5F5",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#A3A3A3", marginBottom: 5 }}
                    formatter={(value) => [
                      Number(value).toFixed(4),
                      "Exchange rate",
                    ]}
                  />

                  <Area
                    type="linear"
                    dataKey="rate"
                    stroke="#CEF739"
                    strokeWidth={2}
                    fill="url(#limeGradient)"
                    dot={false}
                    activeDot={{
                      r: 4,
                      fill: "#CEF739",
                      stroke: "#171719",
                      strokeWidth: 2,
                    }}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
