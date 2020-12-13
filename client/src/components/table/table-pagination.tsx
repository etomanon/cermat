import React, { useCallback } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import { ComponentProps } from '@material-ui/data-grid'
import { useForm } from 'react-hook-form'
import { FormAutocomplete, Option } from '@/components/form/form-autocomplete'
import { Form } from '@/components/form/form'
import { Box } from '@material-ui/core'
import styled from 'styled-components'

type FormData = {
  pageSize: Option<number>
}

export const INIT_PAGE_SIZE = 10
export const ROWS_PER_PAGE = [10, 25, 50, 100]

const options: Option<number>[] = ROWS_PER_PAGE.map((c) => ({
  value: c,
  label: c.toString(),
}))

const defaultValues: FormData = {
  pageSize: options.find((o) => o.value === INIT_PAGE_SIZE) as Option<number>,
}

export const TablePagination = ({ pagination, api }: ComponentProps) => {
  const methods = useForm<FormData>({ defaultValues })
  const { handleSubmit } = methods

  const onSubmit = useCallback(
    (data: FormData) => {
      api.current.setPageSize(data.pageSize.value)
    },
    [api]
  )
  return (
    <Box
      width={1}
      display="flex"
      flexWrap="wrap"
      justifyContent={['center', 'center', 'flex-start']}
      mb="1rem"
      mt="1rem"
    >
      <Box
        display="flex"
        mr="auto"
        width={[1, 1, 'auto']}
        mb={['1rem', '1rem', 0]}
        justifyContent={['center', 'center', 'flex-start']}
      >
        <Form onSubmit={onSubmit} methods={methods}>
          <Box width="15rem" pl="2rem">
            <FormAutocomplete
              id="pageSize"
              options={options}
              onChange={handleSubmit(onSubmit)}
              label="Počet řádků"
              disableClearable
            />
          </Box>
        </Form>
      </Box>
      <PaginationStyled
        color="primary"
        page={pagination.page}
        count={pagination.pageCount}
        onChange={(event, value) => api.current.setPage(value)}
        siblingCount={3}
      />
    </Box>
  )
}

const PaginationStyled = styled(Pagination)`
  display: flex;
  ul {
    justify-content: center;
  }
`
