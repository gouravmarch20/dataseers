import React, { useState, useEffect } from "react"
import CreateTask from "./components/CreateTask"
import ListStatus from "./components/ListStatus"
import { Toaster } from "react-hot-toast"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Navbar from "./components/Navbar"
const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks((prev) => {
      const list = JSON.parse(localStorage.getItem("tasks"))
      if (!list) {
        return []
      }
      if (list != null) return list
      return []
    })
  }, [])

  return (
    <div>
      <Navbar />

      <DndProvider backend={HTML5Backend}>
        <div className="bg-slate-100 w-screen min-h-max	 flex flex-col items-center pt-3 gap-16 ">
          <Toaster />

          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListStatus tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>
    </div>
  )
}

export default App
