import styled from "styled-components";

import Calculator from "./Calculator.tsx";
import Bord from "./Bord.tsx";

const Wrap = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
        -125deg,
        rgba(214, 239, 217, 0.5),
        rgba(239, 222, 214, 0.5),
        rgba(203, 218, 239, 0.5)
    );
`;
const Inner = styled.div`
    min-height: 600px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;


export default function Main() {
    return (
        <Wrap>
            <Inner>
                <Bord />
            </Inner>
        </Wrap>
    );
}
