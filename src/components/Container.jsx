import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"

const Container = ({ todos }) => {

    return (
        <div className='container'>
            <h1>Todo App</h1>
            <AddTodo />
            {todos.length === 0
                ? (
                    <p className="no-todos">
                        No Todos
                    </p>
                )
                : (
                    <div className="todos">
                        {todos.map((todo, index) => (
                            <TodoItem key={todo._id} title={todo.title} id={todo._id} index={index} />
                        ))}
                    </div>
                )}

        </div>
    )
}

export default Container
