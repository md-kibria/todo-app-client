import axios from "axios"
import { useState } from "react"
import { useReducerValue } from "../App"

const AddTodo = () => {

    const { dispatch } = useReducerValue()
    const [title, setTitle] = useState('')

    // change handler function
    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    // submit handler function
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/add`, { title })

            dispatch({
                type: 'ADD_TODO',
                payload: {
                    todo: res.data.todo
                }
            })

            // reset the title
            setTitle('')
        } catch (error) {
            dispatch({
                type: 'ERROR_TODO',
                payload: {
                    errors: error.response.data
                }
            })
        }

    }

    return (
        <div className="addTodo">
            <input
                type="text"
                value={title}
                placeholder="Todo item..."
                onChange={(e) => handleChange(e)}
            />
            <input
                type="button"
                value="+"
                onClick={handleSubmit}
            />
        </div>
    )
}

export default AddTodo
