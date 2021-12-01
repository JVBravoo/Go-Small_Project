import React, {useEffect, useState, useCallback} from 'react';
import {Tabs, Layout, Row, Col, Input, message} from 'antd';
import  './TodoList.css';
import TodoTab from './TodoTab';
import TodoForm from './TodoForm';
import {createTodo, deleteTodo, loadTodos, updateTodo} from '../services/todoService';

const {TabPane} = Tabs;
const {Content} = Layout;

const TodoList = () => {
    const [refreshing, setRefreshing] = userState(false);
    const [todos, setTodos] = userState([]);
    const [activeTodos, setActiveTodos] = userState([]);
    const [completedTodos, setCompletedTodos] = userState([]);

    const handleFormSubmit = (todo) => {
        console.log('Todo to create', todo);
        createTodo(todo).then(onRefresh());
        message.success('Todo added!');
    }

    const handleRemoveTodo = (todo) => {
        deleteTodo(todo.id).then(onRefresh());
        message.warn('Todo Removed!');
    }

    const handleToggleTodoStatus = (todo) => {
        todo.completed = !todo.completed;
        updateTodo(todo).then(onRefresh());
        message.info('Todo status updated!');
    }

    const refresh = () => {
        loadTodos().then(json => {
            setTodos(json);
            setActiveTodos(json.filter(todo => !todo.completed));
            setCompletedTodos(json.filter(todo => todo.completed));
        }).then(console.log("fetch completed"));
    }

    const fresh = useCallback(async () => {
        setRefreshing(true);
        let data = await loadTodos();
        setTodos(data);
        setActiveTodos(data.filter(todo => !todo.completed));
        setCompletedTodos(data.filter(todo => todo.completed));
        // await refresh();
        setRefreshing(false);
        console.log("refresh state", refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return(
        <Layout className="layout">
            <Content style={{padding: '0 50px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Project Todos</h1>
                            <TodoForm onFormSubmit={handleFormSubmit}/>
                            <br/>
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TodoTab todos={todos} onTodoRemoval={handleRemoveTodo} onTodoToggle={handleToggleTodoStatus}/>
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTab todos={activeTodos} onTodoRemoval={handleRemoveTodo} onTodoToggle={handleToggleTodoStatus}/>
                                </TabPane>
                                <TabPane tab="Completed" key="completed">
                                    <TodoTab todos={completedTodos} onTodoRemoval={handleRemoveTodo} onTodoToggle={handleToggleTodoStatus}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}

export default TodoList;
