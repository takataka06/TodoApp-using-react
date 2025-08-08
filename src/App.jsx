import { useState } from "react";
import "./App.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText,setTodoText] = useState(""); //入力された文字列を保存するstateを定義
  const [incompleteTodos, setIncompleteTodods] = useState(["todoです1","todoです2"]);
  const [completeTodos, setCompleteTodos] = useState(["todoです3"]);
  const onChangeTodoText = (event) => setTodoText(event.target.value); //入力された文字列をstateに保存する関数
  const onClickAdd = () => {
    if (todoText === "") return; //入力欄が空の場合は何もしない
    const newTodos = [...incompleteTodos, todoText]; //incompleteTodosの配列にtodoTextを追加
    setIncompleteTodods(newTodos); //更新された配列をstateに保存
    setTodoText(""); //入力欄を空にする
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos]; //配列をコピー
    newTodos.splice(index, 1); //指定されたindexの要素を削除
    setIncompleteTodods(newTodos); //更新された配列をstateに保存
  }
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos]; //未完了のtodoをコピー
    newIncompleteTodos.splice(index, 1); //指定されたindexの要素を削除
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]]; //完了のtodoに追加
    setIncompleteTodods(newIncompleteTodos); //更新された未完了の配列をstateに保存
    setCompleteTodos(newCompleteTodos); //更新された完了の配列をstateに保存
  }
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos]; //完了のtodoをコピー
    newCompleteTodos.splice(index, 1); //指定されたindexの要素を削除
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]]; //未完了のtodoに追加
    setCompleteTodos(newCompleteTodos); //更新された完了の配列をstateに保存
    setIncompleteTodods(newIncompleteTodos); //更新された未完了の配列をstateに保存
  }
  return (
    <>
      <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={onClickAdd}/>
      <IncompleteTodos todos={incompleteTodos} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
      
    </> 
  );
}
