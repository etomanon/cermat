import React from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  YAxisProps,
} from 'recharts'

export type GraphLineData = {
  name: string
  [value: string]: number | string
}

export type GraphLineLine = {
  dataKey: string
  color: string
}

type Props = {
  data: GraphLineData[]
  lines: GraphLineLine[]
  yAxis?: YAxisProps
}

export const GraphLine = ({ data, lines, yAxis }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="name" tickMargin={8} />
        <YAxis width={32} domain={['dataMin', 'dataMax']} {...yAxis} />

        <Tooltip />
        <Legend />
        {lines.map((l) => (
          <Line
            key={l.dataKey}
            dataKey={l.dataKey}
            stroke={l.color}
            fill={l.color}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
