import React from "react";
import styled from "styled-components";

import { QuestionWithAnswer } from "./QuestionWithAnswer";

const QuestionEmpty = styled.div`
    border-radius: 4px;
    padding: 20px;
    background-color: #f44336;
    color: white;
    margin-bottom: 15px;
`;

export const QuestionList = ({ allQuestionWithAnswer }) => {
    if (allQuestionWithAnswer?.length > 0) {
        const { length } = allQuestionWithAnswer;

        return allQuestionWithAnswer.map((props, index) => {
            return <QuestionWithAnswer isStart={index === 0} isEnd={index === length - 1} key={props.id} {...props} />;
        });
    } else {
        return <QuestionEmpty>No Questions yet :(</QuestionEmpty>;
    }
};
