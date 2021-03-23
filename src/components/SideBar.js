import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
    padding: 1rem;
    border-right: 2px solid black;

    @media (max-width: 768px) {
        border: none;
    }
`;

const SideBarText = styled.p``;

const selectQuestionWithAnswerList = () => (state) => ({
    allQuestionWithAnswer: state.allQuestionWithAnswer,
});

export const SideBar = () => {
    const { allQuestionWithAnswer } = useSelector(selectQuestionWithAnswerList(), shallowEqual);

    const determineQuestionCount = () => {
        if (allQuestionWithAnswer.length > 0) {
            return `Here you can find ${allQuestionWithAnswer.length} question(s)`;
        } else {
            return "Here you can find no questions...";
        }
    };

    return (
        <Container>
            <SideBarText>{determineQuestionCount()}</SideBarText>
            <SideBarText>Feel free to create your own questions!</SideBarText>
        </Container>
    );
};
