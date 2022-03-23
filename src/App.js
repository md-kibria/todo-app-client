import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useReducer } from 'react';
import './App.css';
import Container from './components/Container';

const StateContext = React.createContext({})
export function useReducerValue() {
  return useContext(StateContext)
}

const initialState = {
  isLoading: true,
  todos: [],
  errors: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return {
        isLoading: false,
        todos: action.payload.todos,
        errors: {}
      }


    case 'ADD_TODO':
      return {
        isLoading: false,
        todos: [...state.todos, action.payload.todo],
        errors: {}
      }

    case 'DELETE_TODO':
      return {
        isLoading: false,
        todos: state.todos.filter(todo => todo._id !== action.payload.todo._id),
        errors: {}
      }

    case 'ERROR_TODO':
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors
      }

    default:
      return state
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/`)

        dispatch({
          type: 'LOAD_TODOS',
          payload: {
            todos: res.data.todos
          }
        })
      } catch (error) {
        dispatch({
          type: 'ERROR_TODO',
          payload: {
            errors: error.response.data
          }
        })
      }

    }

    fetchTodos()
  }, [])

  // error handler
  useEffect(() => {
    if(Object.keys(state.errors).length !== 0) {
      alert(state.errors.error)
    }
  }, [state.errors])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <Container todos={state.todos} />
      </div>
    </StateContext.Provider>
  );
}

export default App;
