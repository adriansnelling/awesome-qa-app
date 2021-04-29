import allQuestionActionType from "../actiontypes/question";

function createQuestionWithAnswer(answer, question, hasDelay) {
    return {
        type: allQuestionActionType.CREATE_QUESTION_WITH_ANSWER,
        payload: { answer, question, hasDelay },
    };
}

function deleteQuestionList() {
    return {
        type: allQuestionActionType.DELETE_QUESTION_LIST,
    };
}

function deleteQuestionWithAnswerById(questionId) {
    return {
        type: allQuestionActionType.DELETE_QUESTION_BY_ID,
        payload: { questionId },
    };
}

function sortQuestionList() {
    return {
        type: allQuestionActionType.SORT_QUESTION_LIST,
    };
}

function editQuestionWithAnswer(questionEditId) {
    return {
        type: allQuestionActionType.EDIT_QUESTION_WITH_ANSWER,
        payload: { questionEditId },
    };
}

function updateQuestionWithAnswer(answer, id, question, hasDelay) {
    return {
        type: allQuestionActionType.UPDATE_QUESTION_WITH_ANSWER,
        payload: { answer, id, question, hasDelay },
    };
}

function cancelQuestionEdit() {
    return {
        type: allQuestionActionType.CANCEL_QUESTION_EDIT,
    };
}

function setIsLoading(isLoading) {
    return {
        type: allQuestionActionType.SET_LOADING,
        payload: { isLoading },
    };
}

export {
    createQuestionWithAnswer,
    deleteQuestionList,
    deleteQuestionWithAnswerById,
    sortQuestionList,
    editQuestionWithAnswer,
    updateQuestionWithAnswer,
    cancelQuestionEdit,
    setIsLoading,
};
