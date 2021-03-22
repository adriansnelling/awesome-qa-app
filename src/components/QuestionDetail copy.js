import React, { Fragment, useEffect, useMemo, useState } from "react";
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

const QuestionAnswerInput = useMemo(
    (handleChange, label, value) => {
        return (
            <Row>
                <Label>{label}</Label>
                <Input onChange={handleChange} value={value} />
            </Row>
        );
    },
    [handleChange, label, value]
);

export const QuestionDetailComponent = () => {
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
            <QuestionAnswerInput handleQuestionChange={handleQuestionChange} question={question} />
            <Row>
                <Label>Question</Label>
                <Input onChange={handleQuestionChange} value={question} />
            </Row>
            <Row>
                <Label>Answer</Label>
                <TextArea onChange={handleAnswerChange} value={answer} />
            </Row>
            <CheckBoxDelay />
            <OptionContainer>
                <ButtonCreate onClick={handleButtonSuccessClick}>{determineTextButtonSuccess()}</ButtonCreate>
                <ButtonCancelIfNeeded />
            </OptionContainer>
        </Container>
    );
};
