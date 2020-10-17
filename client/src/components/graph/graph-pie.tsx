import { theme } from '@/theme/theme'
import { floor, sumBy } from 'lodash'
import React, { useMemo } from 'react'
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts'

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
}

export const GraphPie = ({ data, color }: Props) => {
  const percent = useMemo(() => sumBy(data, 'value') / 100, [data])
  return (
    <PieChart width={300} height={275}>
      <Pie
        nameKey="name"
        data={data}
        cx={150}
        cy={125}
        outerRadius={100}
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
  )
}
