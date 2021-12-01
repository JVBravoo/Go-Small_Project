import React, {useState} from "react";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const Todo = ({todo, onTodoRemoval, onTodoToggle}) => {

    return(
        <List.Item
            action={[
                <Tooltip 
                title={todo.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                <Switch 
                    checkedChildren={<CheckOutlined/>}
                    unCheckedChildren={<CloseOutlined/>}
                    onChange={() => onTodoToggle(todo)}
                    defaultChecked={todo.completed}/>
                </Tooltip>,
                <Popconfirm
                    title={'Are you sure you want to delete?'}
                    onConfirm={() => {
                        onTodoRemoval(todo);
                    }}>
                        <Button className="Remove-todo-button" type="primary" danger>
                            X
                        </Button>
                </Popconfirm>
            ]}
            className="list-item"
            key={todo.id}
            >
            <div className="todo-item">
                <tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
                    {todo.title}
                </tag>
            </div>
        </List.Item>
    )
}

export default Todo;