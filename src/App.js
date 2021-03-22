import {Provider} from "react-redux";
import {createStore, compose} from "redux";
import styled from "styled-components";

import "./App.css";
import {QuestionDetail} from "./components/QuestionDetail";
import {QuestionCreatedList} from "./components/QuestionCreatedList";
import {SideBar} from "./components/SideBar";
import {globalReducer} from "./reducers/global";
import {AllGlobalStyle} from "./styled-components/common";

const AppContainer = styled.div`
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column !important;
    }
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

const preloadedState = {allQuestionWithAnswer: []};
const allEnhancer = [];

if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "function") {
    allEnhancer.push(window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    // Redux DevTools is unavailable.
}

const rootEnhancer = compose(...allEnhancer);
const appStore = createStore(globalReducer, preloadedState, rootEnhancer);

function App() {
    return (
        <Provider store={appStore}>
            <AllGlobalStyle />
            <Header>The awesome Q/A tool</Header>
            <AppContainer>
                <SideBar />
                <QuestionContent>
                    <QuestionCreatedList />
                    <QuestionDetail />
                </QuestionContent>
            </AppContainer>
        </Provider>
    );
}

export default App;
