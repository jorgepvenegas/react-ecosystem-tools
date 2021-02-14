import React from "react";
import styled from "styled-components";

const TodoItemContainer = styled.div`
  border-radius: 5px;
  border: 2px #ddd solid;
  margin-top: 8px;
  margin-bottom: 10px;
  padding: 16px;
  position: relative;
`;

export const getBorderStyleForDate = (startingDate, currentDate) =>
  startingDate > new Date(currentDate - 8_640_000 * 5)
    ? "2px #ddd solid"
    : "2px solid #fd9d9d";

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
  border ${(props) =>
    getBorderStyleForDate(new Date(props.createdAt), Date.now())};
`;

const ButtonsContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
`;
const CompletedButton = styled(Button)`
  background-color: #bada55;
`;

const RemoveButton = styled(Button)`
  background-color: #fd9d9d;
  margin-left: 8px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {
  const Container = todo.isCompleted
    ? TodoItemContainer
    : TodoItemContainerWithWarning;
  return (
    <Container createdAt={todo.createdAt}>
      <h4>
        {todo.text} --- {todo.isCompleted ? "Done" : "Pending"}
      </h4>
      <p>Created at: &nbsp; {new Date(todo.createdAt).toLocaleDateString()}</p>
      <ButtonsContainer>
        <CompletedButton onClick={() => onCompletedPressed(todo.id)}>
          Mark as completed
        </CompletedButton>
        <RemoveButton onClick={() => onRemovePressed(todo.id)}>
          Remove
        </RemoveButton>
      </ButtonsContainer>
    </Container>
  );
};
export default TodoListItem;
