import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: '0.5rem',
    border: `2px solid ${theme.palette.secondary.main}`,
    '&:hover, &:focus': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    marginLeft: 0,
    width: '100%',
    transition: `0.25s ease-in border`,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  autocompleteTextField: {
    '& ::placeholder': {
      color: '#000',
      opacity: 0.7,
    },
  },
}))
