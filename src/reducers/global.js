import {allQuestionActionType} from "../actiontypes/question";

const initialState = {
    allQuestionWithAnswer: [],
    questionEditId: null,
};

function globalReducer(state = initialState, action): StateType {
    if (action.type === allQuestionActionType.CREATE_QUESTION_WITH_ANSWER) {
        const {question, id, answer} = action.payload;

        return {
            ...state,
            allQuestionWithAnswer: state.allQuestionWithAnswer.concat({
                answer,
                id,
                question,
            }),
        };
    } else if (action.type === allQuestionActionType.DELETE_QUESTION_BY_ID) {
        return {
            ...state,
            allQuestionWithAnswer: state.allQuestionWithAnswer.filter(
                (questionWithAnswer) =>
                    questionWithAnswer.id !== action.payload.questionId
            ),
        };
    } else if (action.type === allQuestionActionType.DELETE_QUESTION_LIST) {
        return {
            allQuestionWithAnswer: [],
        };
    } else if (action.type === allQuestionActionType.SORT_QUESTION_LIST) {
        return {
            ...state,
            allQuestionWithAnswer: [...state.allQuestionWithAnswer].sort(
                (questionWithAnswerOne, questionWithAnswerTwo) => {
                    const questionOne = questionWithAnswerOne.question.toUpperCase();
                    const questionTwo = questionWithAnswerTwo.question.toUpperCase();

                    if (questionOne < questionTwo) {
                        return -1;
                    } else if (questionOne > questionTwo) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            ),
        };
    } else if (
        action.type === allQuestionActionType.UPDATE_QUESTION_WITH_ANSWER
    ) {
        const {answer, id, question} = action.payload;

        return {
            ...state,
            allQuestionWithAnswer: state.allQuestionWithAnswer.map(
                (questionWithAnswer) => {
                    if (questionWithAnswer.id === action.payload.id) {
                        return {
                            answer,
                            id,
                            question,
                        };
                    } else {
                        return questionWithAnswer;
                    }
                }
            ),
            questionEditId: null,
        };
    } else if (
        action.type === allQuestionActionType.EDIT_QUESTION_WITH_ANSWER
    ) {
        const {questionEditId} = action.payload;

        return {
            ...state,
            questionEditId,
        };
    } else if (action.type === allQuestionActionType.CANCEL_QUESTION_EDIT) {
        return {
            ...state,
            questionEditId: null,
        };
    }

    return state;
}

export {globalReducer};
