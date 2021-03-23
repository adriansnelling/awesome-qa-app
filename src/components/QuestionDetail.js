import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { createQuestionWithAnswer, updateQuestionWithAnswer } from "../actions/question";
import { QuestionDetailComponent } from "./QuestionDetailComponent";

const selectQuestionDetail = () => (state) => ({
    allQuestionWithAnswer: state.allQuestionWithAnswer,
    questionEditId: state.questionEditId,
});

export const QuestionDetail = () => {
    const { allQuestionWithAnswer, questionEditId } = useSelector(selectQuestionDetail(), shallowEqual);
    const [questionWithAnswer, setQuestionWithAnswer] = useState(null);

    useEffect(() => {
        const questionWithAnswerEdit = allQuestionWithAnswer.find(
            (questionAnswer) => questionAnswer.id === questionEditId
        );

        if (questionWithAnswerEdit) {
            setQuestionWithAnswer(questionWithAnswerEdit);
        } else {
            // No Question with Answer edit.
        }

        return () => {};
    }, [allQuestionWithAnswer, questionEditId]);

    if (questionWithAnswer) {
        return (
            <QuestionDetailComponent
                actionSuccess={updateQuestionWithAnswer}
                questionWithAnswerEdit={questionWithAnswer}
                textSuccess="Update Question"
                textTooltip="Here you can update your question and answer."
            />
        );
    } else {
        return (
            <QuestionDetailComponent
                actionSuccess={createQuestionWithAnswer}
                textSuccess="Create Question"
                textTooltip="Here you can add a new question and answer."
            />
        );
    }
};
