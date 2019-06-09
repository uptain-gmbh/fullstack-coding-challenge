import styled from 'styled-components'

export const Button = styled.div`
    align-self: center;
    border: 1px solid transparent;
    cursor: pointer;
    border-radius: 3px;
    padding: 0.5rem;
    background: #EEEFF0;
    text-align: center;
    color: #757575;
    max-height: 1rem;
    &:hover {
        @media (hover: hover) {
            background: #e36566;
            color: #fff;
            box-shadow: 0 0 4px #757575;
        }
    }
`
