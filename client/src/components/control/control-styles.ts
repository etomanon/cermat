import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  active: {
    textDecoration: 'underline',
  },
  hover: {
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
}))
