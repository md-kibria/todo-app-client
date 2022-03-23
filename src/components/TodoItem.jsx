import axios from "axios"
import { useReducerValue } from "../App"

const TodoItem = ({ title, id, index }) => {

    const { dispatch } = useReducerValue()

    // delete handler function
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/delete/${id}`)

            dispatch({
                type: 'DELETE_TODO',
                payload: {
                    todo: res.data.todo
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

    return (
        <div className='todo'>
            <p className="index">
                {index + 1}
            </p>
            <h2 className="title">
                {title}
            </h2>
            <button className="btn" onClick={() => handleDelete(id)}>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="#ff6d38" />
                    </svg>
                </span>
            </button>
        </div>
    )
}

export default TodoItem
