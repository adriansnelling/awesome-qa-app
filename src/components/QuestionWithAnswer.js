import React, {Fragment, useState} from "react";
import {useDispatch} from "react-redux";
import styled, {css} from "styled-components";
import {
    deleteQuestionWithAnswerById,
    editQuestionWithAnswer,
} from "../actions/question";
import {ButtonDelete, ButtonSort} from "../styled-components/common";

const determineContainerBorderRadius = (props) => {
    const {isStart, isEnd} = props;
    debugger;
    if (isStart && isEnd) {
        return css`
            border-radius: 4px;
        `;
    } else if (isEnd) {
        return css`
            border-top: none;
            border-radius: 0 0 4px 4px;
        `;
    } else if (isStart) {
        return css`
            border-radius: 4px 4px 0 0;
        `;
    } else {
        return css`
            border-top: none;
        `;
    }
};
const Container = styled.div`
    border: 1px solid black;
    ${determineContainerBorderRadius};
    padding: 0.5rem;
`;
const Question = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
`;
const QuestionOption = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 10rem;
`;
const Answer = styled.div``;
const QuestionText = styled.p``;

export const QuestionWithAnswer = ({answer, id, isStart, isEnd, question}) => {
    const [isAnswerShown, setIsAnswerShown] = useState(false);
    const dispatch = useDispatch();

    const toggleAnswerVisibility = () => {
        setIsAnswerShown(!isAnswerShown);
    };

    const handleButtonDeleteClick = () => {
        dispatch(deleteQuestionWithAnswerById(id));
    };

    const handleButtonEditClick = () => {
        dispatch(editQuestionWithAnswer(id));
    };

    const QuestionToggleAnswer = () => {
        return (
            <Question onClick={toggleAnswerVisibility}>
                <QuestionText>{question}</QuestionText>
                <QuestionOption>
                    <ButtonSort onClick={handleButtonEditClick}>
                        Edit
                    </ButtonSort>
                    <ButtonDelete onClick={handleButtonDeleteClick}>
                        Delete
                    </ButtonDelete>
                </QuestionOption>
            </Question>
        );
    };

    const QuestionAndAnswerIfNeeded = () => {
        if (isAnswerShown) {
            return (
                <Fragment>
                    <QuestionToggleAnswer />
                    <Answer>{answer}</Answer>
                </Fragment>
            );
        } else {
            return <QuestionToggleAnswer />;
        }
    };

    return (
        <Container isEnd={isEnd} isStart={isStart}>
            <QuestionAndAnswerIfNeeded />
        </Container>
    );
};
