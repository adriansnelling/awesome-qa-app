import React from "react";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import styled from "styled-components";

import "./App.css";
import QuestionDetail from "./components/detail/QuestionDetail";
import QuestionCreatedList from "./components/list/QuestionCreatedList";
import { SideBar } from "./components/components/SideBar";
import globalReducer from "./reducers/global";
import { AllGlobalStyle } from "./styled-components/common";

const AppContainer = styled.div`
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column !important;
    }
`;

const ViewContainer = styled.div`
    height: calc(100vh - 2rem); ;
`;

const Header = styled.h1`
    text-align: center;
`;

const QuestionContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column !important;
        width: 100%;
    }
`;

const preloadedState = { allQuestionWithAnswer: [] };
const allEnhancer = [];

/* eslint-disable no-underscore-dangle */
if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "function") {
    allEnhancer.push(window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    // Redux DevTools is unavailable.
}
/* eslint-enable no-underscore-dangle */

const rootEnhancer = compose(...allEnhancer);
const appStore = createStore(globalReducer, preloadedState, rootEnhancer);

function App() {
    return (
        <Provider store={appStore}>
            <AllGlobalStyle />
            <ViewContainer>
                <Header>The awesome Q/A tool</Header>
                <AppContainer>
                    <SideBar />
                    <QuestionContent>
                        <QuestionCreatedList />
                        <QuestionDetail />
                    </QuestionContent>
                </AppContainer>
            </ViewContainer>
        </Provider>
    );
}

export default App;
