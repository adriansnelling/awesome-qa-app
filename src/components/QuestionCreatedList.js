import React, { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { deleteQuestionList, sortQuestionList } from "../actions/question";
import { ButtonSort, ButtonDelete, Container } from "../styled-components/common";
import { QuestionList } from "./QuestionList";
import { Tooltip } from "./Tooltip";

const QuestionContainer = styled.div`
    margin-bottom: 1rem;
`;

const ListContainer = styled.div`
    width: 100%;
`;

const OptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const QuestionHeader = styled.h1`
    text-align: center;
`;

const selectQuestionWithAnswerList = () => (state) => ({
    allQuestionWithAnswer: state.allQuestionWithAnswer,
});

export const QuestionCreatedList = React.memo(() => {
    const { allQuestionWithAnswer } = useSelector(selectQuestionWithAnswerList(), shallowEqual);
    const dispatch = useDispatch();

    const handleButtonDeleteClicked = useCallback(() => {
        dispatch(deleteQuestionList());
    });

    const handleButtonSortClicked = useCallback(() => {
        dispatch(sortQuestionList());
    });

    return (
        <Container>
            <Tooltip text="Here you can find the questions and answers.">
                <QuestionHeader>Created questions</QuestionHeader>
            </Tooltip>
            <ListContainer>
                <QuestionContainer>
                    <QuestionList allQuestionWithAnswer={allQuestionWithAnswer} />
                </QuestionContainer>
                <OptionContainer>
                    <ButtonSort onClick={handleButtonSortClicked}>Sort Questions</ButtonSort>
                    <ButtonDelete onClick={handleButtonDeleteClicked}>Delete all questions</ButtonDelete>
                </OptionContainer>
            </ListContainer>
        </Container>
    );
});
