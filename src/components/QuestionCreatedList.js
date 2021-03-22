import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { deleteQuestionList, sortQuestionList } from "../actions/question";
import { ButtonSort, ButtonDelete, Container } from "../styled-components/common";
import { QuestionWithAnswer } from "./QuestionWithAnswer";
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

const QuestionEmpty = styled.div`
    border-radius: 4px;
    padding: 20px;
    background-color: #f44336;
    color: white;
    margin-bottom: 15px;
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

    const QuestionList = () => {
        if (allQuestionWithAnswer?.length > 0) {
            const length = allQuestionWithAnswer.length;
            return allQuestionWithAnswer.map((props, index) => {
                return (
                    <QuestionWithAnswer isStart={index === 0} isEnd={index === length - 1} key={props.id} {...props} />
                );
            });
        } else {
            return <QuestionEmpty>No Questions yet :(</QuestionEmpty>;
        }
    };

    const handleButtonDeleteClicked = () => {
        dispatch(deleteQuestionList());
    };

    const handleButtonSortClicked = () => {
        dispatch(sortQuestionList());
    };

    return (
        <Container>
            <Tooltip text="Here you can find the questions and answers.">
                <QuestionHeader>Created questions</QuestionHeader>
            </Tooltip>
            <ListContainer>
                <QuestionContainer>
                    <QuestionList />
                </QuestionContainer>
                <OptionContainer>
                    <ButtonSort onClick={handleButtonSortClicked}>Sort Questions</ButtonSort>
                    <ButtonDelete onClick={handleButtonDeleteClicked}>Delete all questions</ButtonDelete>
                </OptionContainer>
            </ListContainer>
        </Container>
    );
});
