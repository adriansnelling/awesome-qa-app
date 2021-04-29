import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ButtonDelete, ButtonSort } from "../../styled-components/common";

import QuestionWithAnswer from "./QuestionWithAnswer";

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

const QuestionList = ({ allQuestionWithAnswer, questionEditId, deleteQuestionList, sortQuestionList }) => {
    const dispatch = useDispatch();
    const listLength = allQuestionWithAnswer?.length ?? 0;

    const handleButtonDeleteClicked = useCallback(() => {
        dispatch(deleteQuestionList());
    });

    const handleButtonSortClicked = useCallback(() => {
        dispatch(sortQuestionList());
    });

    return (
        <ListContainer>
            <QuestionContainer>
                {allQuestionWithAnswer.map((props, index) => (
                    <QuestionWithAnswer
                        isStart={index === 0}
                        isEnd={index === listLength - 1}
                        isEditing={questionEditId === props.id}
                        key={props.id}
                        {...props}
                    />
                ))}
            </QuestionContainer>
            <OptionContainer>
                <ButtonSort onClick={handleButtonSortClicked}>Sort Questions</ButtonSort>
                <ButtonDelete onClick={handleButtonDeleteClicked}>Delete all questions</ButtonDelete>
            </OptionContainer>
        </ListContainer>
    );
};

export default QuestionList;
