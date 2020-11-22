import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  buttonTableWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -67%)',
    width: '31rem',
  },
  buttonTable: {
    [theme.breakpoints.up('sm')]: {
      padding: '2rem 1rem',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '3rem 1.8rem',
    },
  },
}))
