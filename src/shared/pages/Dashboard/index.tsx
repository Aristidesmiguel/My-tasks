import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { DashboardHeader, Menu, Button } from "../../components";

import dashboardCss from "./dashboard.module.css";
import dataBase from "../../server/bancoDeDados";
import { chave } from "../AddTasks";
import { ITarefa, ToastStatus } from "../../utils";

export const Dashboard = () => {
  const [isOpenM, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState<ITarefa[]>([]);
  const [isOpenD, setIsOpenD] = useState(false);
  const [value, setValue] = useState('')
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClickButton_TaskRemove = () => {
    if (selectedTaskId !== null) {
      dataBase.removeTarefa(chave, selectedTaskId);
      setTimeout(() => {
        setTasks(tasks.filter((item) => item.id !== selectedTaskId));
        showToast("Tarefa Eliminada", 'info')
      }, 1000);
    }
    setIsOpenD(false);
  };

  const onChoseD = () => {
    setIsOpenD(false);
  };
  const onOpenD = (id: number) => {
    setIsOpenD(true);
    setSelectedTaskId(id);
    console.log(id);
  };

  const onCloseM = () => {
    setIsOpen(false);
  };
  const onOpenM = () => {
    setIsOpen(true);
  };
  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const test = { ...task, isSelect: !task.isSelect };
          dataBase.isCompled("listas", test);
          return test
        }
        return task;
      })
    );
  };
  useEffect(() => {
    dataBase.buscarTarefas().then((tasks) => setTasks(tasks));
  }, []);

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
      <Modal onClose={onChoseD} isOpen={isOpenD} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent style={{ background: "#263941", color: "white" }}>
          <ModalHeader className="modal_cabeca">
            <h1>Deletar Tarefa</h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>Tens a certeza que deseja eliminar esta tarefa?</h1>
            <p>Este processo é inreverssível.</p>
          </ModalBody>
          <ModalFooter>
            <div className="footer">
              <Button
                handleClickButton={handleClickButton_TaskRemove}
                title="Deletar"
              />
              <Button handleClickButton={onChoseD} title="Cancelar" />
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DashboardHeader onOpen={onOpenM} />
      <div className={dashboardCss.container_dashboard_main}>
        <main>
          <div className={dashboardCss.contaner}>
            <div className={dashboardCss.title_main}>
              <h1>My Tasks</h1>
              <p>
                Register your tasks and have a better monitoring of your
                activities
              </p>
            </div>

            <div className={dashboardCss.campTheTasks}>
              <div className={dashboardCss.createTaskInput}>
                <img className={dashboardCss.search} src="search.png" alt="" />
                <input
                  value={value}
                  onChange={handleOnChange}
                  id="valueInput"
                  type="text"
                  placeholder="Pesquisar Tarefa"
                />
              </div>
              <div className={dashboardCss.tasks_container}>
                <div className={dashboardCss.title_main}>
                  <h3>{" Tasks - " + tasks.length}</h3>
                </div>
                <div id="myList" className={dashboardCss.tasks}>
                  <ul>
                    {tasks.filter(task => task.title?.toLocaleLowerCase().includes(value.toLocaleLowerCase())).map((task) => (
                      <div>
                        <div

                          id="list"
                          className={dashboardCss.tasksCreated}
                          key={task.id}
                        >
                          <div className={dashboardCss.contanerFlex}>
                            <div className={dashboardCss.info}>
                              <input
                                checked={task.isSelect}
                                onClick={() => handleToggleComplete(task.id)}
                                type="checkbox"
                              />
                              <li
                                style={{
                                  textDecoration: task.isSelect
                                    ? "line-through"
                                    : "none",
                                  listStyle: "none",
                                }}
                              >
                                {task.title}
                              </li>
                            </div>
                            <span style={{ color: '#b4acf9', fontSize: '10px' }}>{task.data}</span>
                          </div>
                          <img
                            onClick={() => onOpenD(task.id)}
                            style={{
                              display: task.isSelect ? "block" : "none",
                            }}
                            src="delete.png"
                            alt="Botão de apagar tarefa"
                          />
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
