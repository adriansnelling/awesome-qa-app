import React, { Fragment } from "react";

import { Input, InputRow, Label, TextArea } from "../styled-components/common";

const QuestionAnswer = ({ handleQuestionChange, question, handleAnswerChange, answer }) => (
    <Fragment>
        <InputRow>
            <Label>Question</Label>
            <Input onChange={handleQuestionChange} value={question} />
        </InputRow>
        <InputRow>
            <Label>Answer</Label>
            <TextArea onChange={handleAnswerChange} value={answer} />
        </InputRow>
    </Fragment>
);

export default QuestionAnswer;
