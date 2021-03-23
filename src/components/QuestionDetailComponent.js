import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { cancelQuestionEdit } from "../actions/question";
import {
    ButtonCreate,
    ButtonDelete,
    Checkbox,
    Container,
    Input,
    InputRow,
    Label,
    LoadingSpinner,
    TextArea,
} from "../styled-components/common";
import { Tooltip } from "./Tooltip";

const OptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CheckboxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const initialState = {
    answer: "",
    id: null,
    question: "",
};

export const QuestionDetailComponent = ({ actionSuccess, questionWithAnswerEdit, textSuccess, textTooltip }) => {
    const dispatch = useDispatch();
    const [questionWithAnswer, setQuestionWithAnswer] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const { answer, id, question } = questionWithAnswer;
    const [hasDelay, setHasDelay] = useState(false);

    useEffect(() => {
        if (questionWithAnswerEdit) {
            setQuestionWithAnswer(questionWithAnswerEdit);
        } else {
            // No existing q/a provided.
        }
    }, [questionWithAnswerEdit]);

    const handleAnswerChange = useCallback((eventChangeAnswer) => {
        setQuestionWithAnswer({
            ...questionWithAnswer,
            answer: eventChangeAnswer.target.value,
        });
    });

    const handleQuestionChange = useCallback((eventChangeQuestion) => {
        setQuestionWithAnswer({
            ...questionWithAnswer,
            question: eventChangeQuestion.target.value,
        });
    });

    const dispatchSuccessFunction = () => {
        if (id) {
            dispatch(actionSuccess(questionWithAnswer));
        } else {
            dispatch(actionSuccess(answer, `${question}_${new Date().getTime()}`, question));
        }
    };

    const dispatchSuccessFunctionWithDelayInNeeded = () => {
        if (hasDelay) {
            setIsLoading(true);

            setTimeout(() => {
                dispatchSuccessFunction();
                setIsLoading(false);
            }, 5000);
        } else {
            dispatchSuccessFunction();
        }

        setQuestionWithAnswer(initialState);
    };

    const handleButtonSuccessClick = useCallback(() => {
        if (answer && question) {
            dispatchSuccessFunctionWithDelayInNeeded();
        } else {
            alert("Please provide a question and answer.");
        }
    }, [answer, question, hasDelay]);

    const handleButtonCancelClick = useCallback(() => {
        dispatch(cancelQuestionEdit());

        setQuestionWithAnswer(initialState);
    });

    const handleCheckBoxDelayChanged = useCallback(() => {
        setHasDelay(!hasDelay);
    }, [answer, question, hasDelay, questionWithAnswerEdit]);

    const ButtonCancelIfNeeded = () => {
        if (questionWithAnswerEdit) {
            return <ButtonDelete onClick={handleButtonCancelClick}>Cancel</ButtonDelete>;
        } else {
            return null;
        }
    };

    const renderEditFormOrSpinner = () => {
        if (isLoading) {
            return <LoadingSpinner />;
        } else {
            return (
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
        }
    };

    return (
        <Container>
            <Tooltip text={textTooltip}>
                <h1>{textSuccess}</h1>
            </Tooltip>
            {renderEditFormOrSpinner()}
            <CheckboxContainer>
                <label>With delay</label>
                <Checkbox onChange={handleCheckBoxDelayChanged} type="checkbox" checked={hasDelay} />
            </CheckboxContainer>
            <OptionContainer>
                <ButtonCreate onClick={handleButtonSuccessClick}>{textSuccess}</ButtonCreate>
                <ButtonCancelIfNeeded />
            </OptionContainer>
        </Container>
    );
};
