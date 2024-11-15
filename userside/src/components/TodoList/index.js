import React, { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md"
import axios from 'axios';
import './index.css';

const TodoList = () => {
    const [todo, setTodo] = useState('');
    const [status, setStatus] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null); // Track the ID being edited
    const user = Cookies.get('user_name')

    const getApiData = useCallback(async () => {
        const userId = user
        try {
            const response = await axios.get(`http://localhost:4000/todoList/${userId}`);
            setTodos(response.data.list); 
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    },[user])

    useEffect(() => {
        getApiData();
    }, [getApiData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error('User not found.');
            return;
        }
        try {
            await axios.post(`http://localhost:4000/todoPost/${user}`, {
                task: todo,
                status: status
            });
            setTodo('');
            setStatus('');
            getApiData(); // Refresh the list after adding
        } catch (err) {
            console.error('Error adding todo:', err);
        }
    };
    

    const onClickUpdate = async (id) => {
        try {
            await axios.put(`http://localhost:4000/updateTodo/${id}`, {
                task: todo,
                status: status
            });
            setEditId(null); // Clear edit mode
            setTodo('');
            setStatus('');
            await getApiData(); 
        } catch (err) {
            console.error('Error updating todo:', err);
        }
    };

    const onClickDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:4000/deleteTodo/${id}`)
            getApiData(); 
        }catch(err){
            console.error('Error updating todo:', err);
        }

    }

    return (
        <div className="todo-container">
            <form onSubmit={handleSubmit} className="text-center p-3">
                <input 
                    type="text" 
                    placeholder="Enter todo" 
                    value={todo} 
                    onChange={(e) => setTodo(e.target.value)} 
                    style={{ width: '50vw', marginRight: '10px' }} 
                />
                <input 
                    type="text" 
                    placeholder="Enter status" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                />
                <button type="submit" className="btn btn-primary mb-1">Submit</button>
            </form>

            <div className="todo-list">
                {todos.length > 0 ? (
                    <ul>
                        {todos.map((eachItem) => (
                            <li key={eachItem.id}>
                                <div className="todo-item">
                                    <input
                                        style={{ width: '70vw' }}
                                        type="text"
                                        value={eachItem.id === editId ? todo : eachItem.task}
                                        onChange={(e) => setTodo(e.target.value)}
                                    />
                                    <p className='pt-3 text-center' style={{width:'120px'}}>{eachItem.status}</p>
                                    <button type='button' className="icon-btn" onClick={() => onClickDelete(eachItem.id)}><MdOutlineDelete /></button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditId(eachItem.id);
                                            setTodo(eachItem.task); // Set task for editing
                                            setStatus(eachItem.status); // Set status for editing
                                        }}
                                        className="icon-btn"
                                    >
                                        <FaRegEdit />
                                    </button>

                                    {eachItem.id === editId && (
                                        <button
                                            type="button"
                                            onClick={() => onClickUpdate(eachItem.id)}
                                            className="btn btn-secondary"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No todo item is available</p>
                )}
            </div>
        </div>
    );
}

export default TodoList;
