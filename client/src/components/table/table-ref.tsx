import React, { useEffect } from 'react'
import { ComponentProps, SortModel } from '@material-ui/data-grid'

type Props = {
  params: React.PropsWithChildren<ComponentProps>
  sortModel: SortModel
}

export const TableRef = ({ params, sortModel }: Props) => {
  useEffect(() => {
    params.api.current.setSortModel(sortModel)
  }, [sortModel, params.api])

  return null
}
