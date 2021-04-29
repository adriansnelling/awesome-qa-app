import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { Container } from "../../styled-components/common";
import FormButtons from "../components/FormButtons";
import QuestionAnswer from "./QuestionAnswer";
import Tooltip from "../components/Tooltip";
import Tools from "../../tools/tools";

const initialState = {
    answer: "",
    question: "",
};

const QuestionDetailAdd = ({ createQuestionWithAnswer, setIsLoading }) => {
    const dispatch = useDispatch();
    const [questionWithAnswer, setQuestionWithAnswer] = useState(initialState);
    const { answer, question } = questionWithAnswer;

    const handleAnswerChange = useCallback(
        (eventChangeAnswer) => {
            setQuestionWithAnswer({
                ...questionWithAnswer,
                answer: eventChangeAnswer.target.value,
            });
        },
        [questionWithAnswer]
    );

    const handleQuestionChange = useCallback(
        (eventChangeQuestion) => {
            setQuestionWithAnswer({
                ...questionWithAnswer,
                question: eventChangeQuestion.target.value,
            });
        },
        [questionWithAnswer]
    );

    const handleButtonSuccessClick = useCallback(
        async (hasDelay) => {
            if (answer && question) {
                dispatch(setIsLoading(true));

                if (hasDelay) {
                    await Tools.waitForDelay();
                }

                dispatch(createQuestionWithAnswer(answer, question, hasDelay));
                dispatch(setIsLoading(false));
                setQuestionWithAnswer(initialState);
            } else {
                alert("Please provide a question and answer.");
            }
        },
        [questionWithAnswer]
    );

    const handleButtonCancelClick = useCallback(() => {
        setQuestionWithAnswer(initialState);
    });

    return (
        <Container>
            <Tooltip text="Here you add your new questions and answers.">
                <h1>New Question</h1>
            </Tooltip>
            <QuestionAnswer
                answer={answer}
                handleAnswerChange={handleAnswerChange}
                handleQuestionChange={handleQuestionChange}
                question={question}
            />
            <FormButtons
                buttonSuccessFunction={handleButtonSuccessClick}
                handleButtonCancelClick={handleButtonCancelClick}
                textFail="Clear"
                textSuccess="Create"
            />
        </Container>
    );
};

export default QuestionDetailAdd;
