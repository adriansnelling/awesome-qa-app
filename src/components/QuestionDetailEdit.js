import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { cancelQuestionEdit } from "../actions/question";
import { Container } from "../styled-components/common";
import FormButtons from "./components/FormButtons";
import QuestionAnswer from "./QuestionAnswer";
import Tooltip from "./Tooltip";
import Tools from "../tools/tools";

const initialState = {
    answer: "",
    id: null,
    question: "",
};

const QuestionDetailEdit = ({ updateQuestionWithAnswer, questionWithAnswer, setIsLoading }) => {
    const dispatch = useDispatch();
    const [questionWithAnswerEdit, setQuestionWithAnswerEdit] = useState(questionWithAnswer ?? initialState);
    const { answer, id, question } = questionWithAnswerEdit;

    const handleAnswerChange = useCallback(
        (eventChangeAnswer) => {
            setQuestionWithAnswerEdit({
                ...questionWithAnswer,
                answer: eventChangeAnswer.target.value,
            });
        },
        [questionWithAnswerEdit]
    );

    const handleQuestionChange = useCallback(
        (eventChangeQuestion) => {
            setQuestionWithAnswerEdit({
                ...questionWithAnswer,
                question: eventChangeQuestion.target.value,
            });
        },
        [questionWithAnswerEdit]
    );

    const handleButtonUpdateClick = useCallback(
        (hasDelay) => {
            if (answer && question) {
                dispatch(setIsLoading(true));

                if (hasDelay) {
                    Tools.waitFotDelay();
                }

                dispatch(updateQuestionWithAnswer(answer, id, question, hasDelay));
                dispatch(setIsLoading(false));
            } else {
                alert("Please provide a question and answer.");
            }
        },
        [questionWithAnswerEdit]
    );

    const handleButtonCancelClick = useCallback(() => {
        dispatch(cancelQuestionEdit());
    });

    return (
        <Container>
            <Tooltip text="Here you can update your question and answer.">
                <h1>Update Question</h1>
            </Tooltip>
            <QuestionAnswer
                answer={answer}
                handleAnswerChange={handleAnswerChange}
                handleQuestionChange={handleQuestionChange}
                question={question}
            />
            <FormButtons
                buttonSuccessFunction={handleButtonUpdateClick}
                handleButtonCancelClick={handleButtonCancelClick}
                textFail="Cancel"
                textSuccess="Update"
            />
        </Container>
    );
};

export default QuestionDetailEdit;
