import styled, { css } from 'styled-components'
import { FormAutocompleteRemote } from '../form/form-autocomplete-remote'

export const Wrapper = styled.div`
  ${(props) => {
    const mainSecondary = props.theme.palette.secondary.main
    const mainPrimary = props.theme.palette.primary.main

    return css`
    position: relative;
    border-radius: 0.5rem;
    border 2px solid ${mainSecondary};
    margin-left: 0;
    width: 100%;
    &:hover, &:focus {
      border: 2px solid ${mainPrimary};
    }
`
  }}
`

export const SearchIconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
  height: 100%;
  pointer-events: none;
  justify-content: center;
`

export const FormAutocompleteRemoteStyled = styled(FormAutocompleteRemote)`
  &&&&& .MuiAutocomplete-input {
    color: inherit;
    padding: 1rem;
    padding-left: 4rem;
    width: 100%;

    &::placeholder {
      color: #000;
      opacity: 0.7;
    }
  }
` as typeof FormAutocompleteRemote
