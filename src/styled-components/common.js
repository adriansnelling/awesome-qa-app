import styled, { keyframes, createGlobalStyle } from "styled-components";

const AllGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Notable');
  * {
    font-family: 'Notable', sans-serif;
  }
`;

const Button = styled.button`
    min-width: 4rem;
    max-width: 10rem;
    border: none;
    color: white;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    border-radius: 4px;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
`;

const ButtonCreate = styled(Button)`
    background-color: #4caf50;
`;

const ButtonSort = styled(Button)`
    background-color: #205c9f;
`;

const ButtonDelete = styled(Button)`
    background-color: #ce5859;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
    animation: ${rotate360} 1s linear infinite;
    transform: translateZ(0);

    margin: 1rem;
    border-top: 2px solid grey;
    border-right: 2px solid grey;
    border-bottom: 2px solid grey;
    border-left: 2px solid black;
    background: transparent;
    width: 24px;
    height: 24px;
    border-radius: 50%;
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

const InputRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export {
    AllGlobalStyle,
    ButtonCreate,
    ButtonSort,
    ButtonDelete,
    Checkbox,
    Container,
    Label,
    LoadingSpinner,
    Input,
    InputRow,
    TextArea,
};
