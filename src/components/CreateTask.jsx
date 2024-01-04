import React, { useState } from "react"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  })
  const handleSubmit = (e) => {
    e.preventDefault()

    
    if (task.name.length < 3) {
      return toast.error("A task must have more than 3 char ")
    }
    if (task.name.length > 100) {
      return toast.error("A task must have less than 100 char ")
    }
    setTasks((prev) => {
      if (prev?.length == 0) {
        const list =  [...prev, task]

        localStorage.setItem("tasks", JSON.stringify(list))
        return list
      } else {
        const list = [...prev, task]
        localStorage.setItem("tasks", JSON.stringify(list))
        return list
      }
    })
    toast.success("  task created ")
    setTask({
        id: "",
        name: "",
        status: "todo",
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1 "
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Create Task
      </button>
    </form>
  )
}

export default CreateTask
