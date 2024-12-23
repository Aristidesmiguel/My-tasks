import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DashboardHeader, Menu } from "../../components";
import { CiEdit } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";

import editTasks from "./EditTasks.module.css";
import dataBase from "../../server/bancoDeDados";
import { ITarefa, ToastStatus } from "../../utils";
import { useAuth } from "../../hooks";

export const TasksEdit = () => {
  const [isOpenM, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<ITarefa[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const onCloseM = () => {
    setIsOpen(false);
  };
  const onOpenM = () => {
    setIsOpen(true);
  };

  const { user } = useAuth();
  const userId = user?.uid;

  useEffect(() => {
    if (userId) {
      dataBase.buscarTarefas(userId).then((tasks) => setTasks(tasks));
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue === "") {
        showToast("Nenhuma tarefa selecionada", 'info');
      } else {
        mainFunction();
      }
    }
  };

  const handleOnClickButton = () => {
    if (inputValue === "") {
      showToast("Nenhuma tarefa selecionada", 'info');
    } else {
      mainFunction();
    }
  };

  const onEditTask = async () => {
    if (selectedTaskId === null) {
      showToast("Nenhuma tarefa selecionada", 'warning');
      return;
    }
    const taskToUpdate = tasks.find((tarefa) => tarefa.id === selectedTaskId);
    if (taskToUpdate) {
      const updatedTask = { ...taskToUpdate, title: inputValue.trim() };
      await dataBase.editarTarefa(updatedTask)
      setTasks(
        tasks.map((task) =>
          task.id === selectedTaskId
            ? { ...task, title: inputValue.trim() }
            : task
        )
      );
    } else {
      showToast("A tarefa não foi atualizada", 'warning');
    }
  }

  const mainFunction = () => {
    toast.promise(onEditTask(), {
      success: {
        title: "Tarefa atualizada com sucesso",
        //position: "top-right"
      },
      error: {
        title: "A tarefa não foi atualizada",
      },
      loading: { title: "Atualizando...", position: "top-right" },
    })

  };

  const handleTaskClick = (value: string, id: number | string) => {
    setInputValue(value);
    setSelectedTaskId(id);
  };

  const toast = useToast();
  const showToast = (title: string, status: ToastStatus) => {
    toast({
      title: title,
      position: "top-right",
      isClosable: true,
      status: status,
    });
  };

  return (
    <>
      <DashboardHeader onOpen={onOpenM} />
      <div className={editTasks.container_dashboard_main}>
        <main>
          <div className={editTasks.contaner}>
            <div className={editTasks.title_main}>
              <h1>Editar Tarefa</h1>
            </div>
            <div className={editTasks.campTheTasks}>
              <div className={editTasks.createTaskInput}>
                <FaRegEdit
                  onClick={handleOnClickButton}
                  className={editTasks.search}
                />
                <input
                  value={inputValue}
                  id="valueInput"
                  type="text"
                  placeholder="Editar Tarefa"
                  onKeyDown={handleOnPressEnter}
                  onChange={handleInputChange}
                />
              </div>
              <div className={editTasks.tasks_container}>
                <div id="myList" className={editTasks.tasks}>
                  <ul>
                    {tasks.map((task) => (
                      <div key={task.id}>
                        <div
                          id="list"
                          className={editTasks.tasksCreated}
                          key={task.id}
                          style={{ display: task.isSelect ? "none" : "block" }}
                        >
                          <div className={editTasks.info}>
                            <li style={{ listStyle: "none" }}>{task.title}</li>
                            <CiEdit
                              onClick={() =>
                                handleTaskClick(task.title, task.id)
                              }
                              className={editTasks.iconEdit}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Drawer placement="left" onClose={onCloseM} isOpen={isOpenM}>
          <DrawerOverlay />
          <DrawerContent style={{ background: "#B4ACF9" }}>
            <DrawerHeader>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody>
              <Menu />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};
