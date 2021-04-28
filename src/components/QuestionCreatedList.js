import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteQuestionList, sortQuestionList } from "../actions/question";

import { Container } from "../styled-components/common";
import QuestionList from "./QuestionList";
import Tooltip from "./Tooltip";

const QuestionHeader = styled.h1`
    text-align: center;
`;

const QuestionEmpty = styled.div`
    border-radius: 4px;
    padding: 20px;
    background-color: #f44336;
    color: white;
    margin-bottom: 15px;
`;

const selectQuestionWithAnswerList = () => (state) => ({
    allQuestionWithAnswer: state.allQuestionWithAnswer,
    questionEditId: state.questionEditId,
});

const QuestionCreatedList = React.memo(() => {
    const { allQuestionWithAnswer, questionEditId } = useSelector(selectQuestionWithAnswerList(), shallowEqual);
    const isListPopulated = allQuestionWithAnswer?.length > 0;

    return (
        <Container>
            <Tooltip text="Here you can find the questions and answers.">
                <QuestionHeader>Created questions</QuestionHeader>
            </Tooltip>
            {isListPopulated ? (
                <QuestionList
                    allQuestionWithAnswer={allQuestionWithAnswer}
                    deleteQuestionList={deleteQuestionList}
                    questionEditId={questionEditId}
                    sortQuestionList={sortQuestionList}
                />
            ) : (
                <QuestionEmpty>No questions... :(</QuestionEmpty>
            )}
        </Container>
    );
});

QuestionCreatedList.displayName = "QuestionCreatedList";

export default QuestionCreatedList;
