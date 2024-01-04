import Task from "./Task"
import Header from "./Header"
import { useDrop } from "react-dnd"
import toast from "react-hot-toast"
const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  let text = "todo"
  let bg = "bg-slate-500"

  let tasksToMap = todos
console.log(88, todos);

  if (status === "todo") {
    let text = "todo"
    let bg = "bg-slate-500"
    tasksToMap = todos
  }
  if (status === "inprogress") {
    text = "In progress"
    bg = "bg-purple-500"
    tasksToMap = inProgress
  }

  if (status === "closed") {
    text = "Closed"
    bg = "bg-green-500"
    tasksToMap = closed
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTask = prev.map((t) => {
        if (t.id == id) {
          return { ...t, status: status }
        }
        return t
      })
      localStorage.setItem("tasks", JSON.stringify(mTask))
      toast("task status changed")
      return mTask
    })
  }
  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2  ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap?.length} />

      {tasksToMap?.length > 0 &&
        tasksToMap?.map((task) => (
          <Task key={task?.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  )
}

export default Section
