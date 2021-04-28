import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { createQuestionWithAnswer, updateQuestionWithAnswer, setIsLoading } from "../actions/question";
import { LoadingSpinner } from "../styled-components/common";
import QuestionDetailAdd from "./QuestionDetailAdd";
import QuestionDetailEdit from "./QuestionDetailEdit";

const selectQuestionDetail = () => (state) => ({
    allQuestionWithAnswer: state.allQuestionWithAnswer,
    questionEditId: state.questionEditId,
    isLoading: state.isLoading,
});

const QuestionDetail = () => {
    const { allQuestionWithAnswer, questionEditId, isLoading } = useSelector(selectQuestionDetail(), shallowEqual);
    const [questionWithAnswer, setQuestionWithAnswer] = useState(null);

    useEffect(() => {
        const questionWithAnswerEdit = allQuestionWithAnswer.find(
            (questionAnswer) => questionAnswer.id === questionEditId
        );

        setQuestionWithAnswer(questionWithAnswerEdit);

        return () => {};
    }, [allQuestionWithAnswer, questionEditId]);

    if (isLoading) {
        return <LoadingSpinner />;
    } else if (questionWithAnswer) {
        return (
            <QuestionDetailEdit
                questionWithAnswer={questionWithAnswer}
                setIsLoading={setIsLoading}
                updateQuestionWithAnswer={updateQuestionWithAnswer}
            />
        );
    } else {
        return <QuestionDetailAdd createQuestionWithAnswer={createQuestionWithAnswer} setIsLoading={setIsLoading} />;
    }
};

export default QuestionDetail;
