import { theme } from '@/theme/theme'
import { Typography } from '@material-ui/core'
import { floor, sumBy } from 'lodash'
import React, { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts'

type GraphPieData = {
  name: string
  value: number
}

type GraphPieColor = {
  [name: string]: string
}

type Props = {
  data: GraphPieData[]
  color: GraphPieColor
  label?: string
}

export const GraphPie = ({ data, color, label }: Props) => {
  const percent = useMemo(() => sumBy(data, 'value') / 100, [data])
  return (
    <>
      {label && (
        <Typography align="center" variant="h5">
          {label}
        </Typography>
      )}
      <div
        style={{
          width: '100%',
          maxWidth: '32rem',
          height: 250,
          margin: 'auto',
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              nameKey="name"
              data={data}
              fill={theme.palette.primary.main}
              dataKey="value"
            >
              {data.map((d) => (
                <Cell key={d.name + d.value} fill={color[d.name]} />
              ))}
            </Pie>
            <Tooltip
              separator=": "
              formatter={(value) =>
                `${value} (${floor((value as number) / percent, 1)} %)`
              }
            />
            <Legend verticalAlign="top" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
