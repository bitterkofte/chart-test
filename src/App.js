import logo from './logo.svg';
import './App.css';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {format, parseISO, subDays } from 'date-fns';

function App() {
  const data = [];

  for (let num = 30; num >= 0; num--){
    data.push({
      date: subDays(new Date(), num).toISOString().substring(0,10),
      value: 1 + Math.random()
    })
  }

  return (
    <div className='appContainer'>
    <ResponsiveContainer width={'90%'} height={400} >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area type="monotone" dataKey={"value"} stroke="#2451B7" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={{ dy: 10 }}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate() % 7 === 0) {
              return format(date, "MMM d");
            }
            return "";
            // return format(date, "MMM d");
          }}
        />

        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={6}
          tick={{ dx: -10 }}
          domain={['auto','auto']}
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />

        <Tooltip cursor={{stroke: '#6924b7'}} wrapperStyle={{ outline: "none" }} content={<CustomTooltip />} />
        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}

export default App;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <div className='tooltipDate'>{format(parseISO(label), "eeee, d MMM, yyyy")}</div>
        <div className='price'>${payload[0].value.toFixed(2)} CAD</div>
      </div>
    );
  }
  return null;
}