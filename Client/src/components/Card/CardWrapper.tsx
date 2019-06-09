import styled from "styled-components"

export const CardWrapper = styled.div.attrs({className: "Card"})`
    height: 9rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 8px 0 rgba(0,0,0,0.2);
    &:hover {
        box-shadow: 0 12px 23px 0 rgba(0,0,0,0.2);
        transform: scale(1.2);
        transition: all .3s;
    }
    margin: 10px;
`
