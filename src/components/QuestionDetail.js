import React, { Fragment, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createQuestionWithAnswer, updateQuestionWithAnswer, cancelQuestionEdit } from "../actions/question";
import { ButtonCreate, ButtonDelete, Container, Spinner } from "../styled-components/common";
import { Tooltip } from "./Tooltip";

const QuestionDetailHeader = styled.h1``;

const OptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Row = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Input = styled.input`
    padding: 0.75rem;
    margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
    height: 3rem;
    padding: 0.75rem;
    margin-bottom: 1rem;
`;

const Label = styled.label`
    margin-bottom: 1rem;
`;

const Checkbox = styled.input``;

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

const selectQuestionDetail = () => (state) => ({
    allQuestionWithAnswer: state.allQuestionWithAnswer,
    questionEditId: state.questionEditId,
});

export const QuestionDetail = () => {
    const dispatch = useDispatch();
    const { allQuestionWithAnswer, questionEditId } = useSelector(selectQuestionDetail(), shallowEqual);
    const [hasDelay, setHasDelay] = useState(false);
    const [questionWithAnswer, setQuestionWithAnswer] = useState(initialState);
    const { answer, id, question } = questionWithAnswer;
    const isEditMode = !!questionEditId;

    useEffect(() => {
        const questionWithAnswerEdit = allQuestionWithAnswer.find(
            (questionWithAnswer) => questionWithAnswer.id === questionEditId
        );
        let isMounted = true;

        if (questionWithAnswerEdit && isMounted) {
            const { answer, id, question } = questionWithAnswerEdit;
            setQuestionWithAnswer({ answer, question, id });
        } else {
            // No Question with Answer edit.
        }

        return () => {
            isMounted = false;
        };
    }, [allQuestionWithAnswer, questionEditId]);

    const handleAnswerChange = (eventChangeAnswer) => {
        setQuestionWithAnswer({
            ...questionWithAnswer,
            answer: eventChangeAnswer.target.value,
        });
    };

    const handleQuestionChange = (eventChangeQuestion) => {
        setQuestionWithAnswer({
            ...questionWithAnswer,
            question: eventChangeQuestion.target.value,
        });
    };

    const determineTextButtonSuccess = () => {
        if (isEditMode) {
            return "Update Question";
        } else {
            return "Create Question";
        }
    };

    const determineTextHeadingQuestionDetail = () => {
        if (isEditMode) {
            return "Update Question";
        } else {
            return "Create Question";
        }
    };

    const determineTextTooltipQuestionDetail = () => {
        if (isEditMode) {
            return "Here you can update your question and answer.";
        } else {
            return "Here you can add a new question and answer.";
        }
    };

    const dispatchSuccessFunction = () => {
        if (hasDelay) {
            // TODO: Add spinner/loading text.
            setTimeout(() => {
                onSuccess();
            }, 5000);
        } else {
            onSuccess();
        }

        setQuestionWithAnswer(initialState);
    };

    const onSuccess = () => {
        if (isEditMode) {
            dispatch(updateQuestionWithAnswer(answer, id, question));
        } else {
            dispatch(createQuestionWithAnswer(answer, `${question}_${new Date().getTime()}`, question));
        }
    };

    const handleButtonSuccessClick = () => {
        if (answer && question) {
            dispatchSuccessFunction();
        } else {
            alert("Please provide a question and answer.");
        }
    };

    const handleButtonCancelClick = () => {
        dispatch(cancelQuestionEdit());

        setQuestionWithAnswer(initialState);
    };

    const handleCheckBoxDelayChanged = () => {
        setHasDelay(!hasDelay);
    };

    const ButtonCancelIfNeeded = () => {
        if (isEditMode) {
            return <ButtonDelete onClick={handleButtonCancelClick}>Cancel</ButtonDelete>;
        } else {
            return null;
        }
    };

    const CheckBoxDelay = () => {
        return (
            <CheckboxContainer>
                <label>With delay</label>
                <Checkbox onChange={handleCheckBoxDelayChanged} type="checkbox" checked={hasDelay} />
            </CheckboxContainer>
        );
    };

    return (
        <Container>
            <Tooltip text={determineTextTooltipQuestionDetail()}>
                <QuestionDetailHeader>{determineTextHeadingQuestionDetail()}</QuestionDetailHeader>
            </Tooltip>
            <Row>
                <Label>Question</Label>
                <Input onChange={handleQuestionChange} value={question} />
            </Row>
            <Row>
                <Label>Answer</Label>
                <Input onChange={handleAnswerChange} value={answer} />
            </Row>
            <CheckBoxDelay />
            <OptionContainer>
                <ButtonCreate onClick={handleButtonSuccessClick}>{determineTextButtonSuccess()}</ButtonCreate>
                <ButtonCancelIfNeeded />
            </OptionContainer>
        </Container>
    );
};
