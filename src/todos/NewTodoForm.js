import styled from "styled-components";
import React, { useState } from "react";
import { connect } from "react-redux";
import { getTodos } from "./selectors";
import { addTodoRequest } from "./thunks";

const FormContainer = styled.div`
  border-radius: 5px;
  padding: 16px;
  text-align: center;
`;

const NewTodoInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 70%;
  outline: none;
`;

const NewTodoButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  width: 20%;
  background-color: #bada55;
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <FormContainer>
      <NewTodoInput
        value={inputValue}
        placeholder="Type some stuff"
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
      ></NewTodoInput>
      <NewTodoButton
        onClick={() => {
          const isDuplicate = todos.some((todo) => todo.text === inputValue);
          if (!isDuplicate) {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}
      >
        Create Todo
      </NewTodoButton>
    </FormContainer>
  );
};

const mapStateToProps = (state) => ({
  todos: getTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
