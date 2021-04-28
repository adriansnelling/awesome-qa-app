import React from "react";
import styled from "styled-components";

const TooltipText = styled.div``;

const TooltipBox = styled.div`
    position: absolute;
    top: calc(100%);
    left: 10%;
    visibility: hidden;
    color: black;
    background-color: white;
    width: 150px;
    padding: 5px 5px;
    border: 1px solid black;
    border-radius: 4px;

    &:before {
        content: "";
        width: 0;
        height: 0;
        left: 40px;
        top: -11px;
        position: absolute;
        border: 10px solid;
        border-color: transparent transparent black black;
        transform: rotate(135deg);
    }
    &:after {
        content: "";
        width: 0;
        height: 0;
        left: 40px;
        top: -10px;
        position: absolute;
        border: 10px solid;
        border-color: white;
        transform: rotate(135deg);
    }
`;

const TooltipCard = styled.div`
    position: relative;
    & ${TooltipText}:hover + ${TooltipBox} {
        visibility: visible;
        color: black;
        background-color: rgba(255, 255, 255);
        width: 230px;
        padding: 8px 8px;
        border: 1px solid black;
        &:before {
            border-color: transparent transparent black black;
        }
    }
`;

const Tooltip = ({ children, text }) => (
    <TooltipCard>
        <TooltipText>{children}</TooltipText>
        <TooltipBox>
            <p>{text}</p>
        </TooltipBox>
    </TooltipCard>
);

export default Tooltip;
