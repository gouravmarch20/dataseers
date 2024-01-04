import { useDrag } from "react-dnd"
import toast from "react-hot-toast"

const Task = ({ setTasks, task, tasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t?.id !== id)
    localStorage.setItem("tasks", JSON.stringify(fTasks))
console.log(99 , fTasks);

    setTasks(fTasks)
    toast("task removed  ")
  }
  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <p>{task?.name}</p>
      <button className="mt-3" onClick={() => handleRemove(task.id)}> ❌ </button>
    </div>
  )
}
export default Task
