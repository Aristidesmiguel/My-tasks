import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { DashboardHeader, Button, Menu } from "../../components";
import { ITarefa, ROUTES, ToastStatus } from "../../utils";

import addtasks from "./addTasks.module.css";
import "./headerAddTasks.css";
import dataBase from "../../server/bancoDeDados";
import { useNavigate } from "react-router-dom";

export const chave = "listas";

export const AddTasks = () => {
  const navegate = useNavigate()
  const onClickBottun = () => {
    navegate(ROUTES.editTasks)
  }
  const [isOpenD, setIsOpenD] = useState(false);
  const [lista, setLista] = useState<ITarefa[]>([]);
  const [selectdDate, setSelectdDate] = useState('')
  console.log(lista);

  const onCloseDrawer = () => {
    setIsOpenD(false);
  };
  const onOpenDrawer = () => {
    setIsOpenD(true);
  };

  const handleAction = (valueOfInput: string, date: string) => {
    const title = valueOfInput.trim()
    if (title.length === 0) {
      showToast("O Campo tarefa, Está Vasio", 'info');
      return;
    } else if (date === "") {
      showToast("O Campo Date, Está Vasio", 'info');
      return;
    }

    if (lista.some((listItem) => listItem.title === title)) {
      showToast("Tarefa Já Existe", 'info');
    } else {
      const task: ITarefa = {
        id: Date.now(),
        isSelect: false,
        title: title,
        data: date
      };

      dataBase.salvarTarefa(task)
        .then(() => {
          setLista((newTasks) => [...newTasks, task]);
          showToast("Tarefa Criada Com Sucesso", 'success');
        })
        .catch(() => showToast("Erro ao salvar a tarefa", 'error'));
    }
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

  const handleOnKeyDonw: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleAction(e.currentTarget.value, selectdDate)
      e.currentTarget.value = ""
    }
  }
  const handleOnDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectdDate(e.target.value)
  }


  const handleOnClickButton = () => {
    const inputElement = document.getElementById("value") as HTMLInputElement
    handleAction(inputElement.value, selectdDate)
    inputElement.value = ""
  }

  return (
    <>
      <header className="headerAddTasks">
        <DashboardHeader onOpen={onOpenDrawer} />
      </header>
      <div className={addtasks.container_main}>
        <main className={addtasks.addTasksMain}>
          <div className={addtasks.corpo}>
            <div className={addtasks.title}>
              <div className={addtasks.img}>
                <a href={ROUTES.dashboard}>
                  <img src="seta-esquerda.png" alt="seta-esquerda" />
                </a>
              </div>
              <div className={addtasks.subtitle}>
                <h1>Add tasks</h1>
                <p>Adiciona suas tarefas aqui</p>
              </div>
            </div>
            <div className={addtasks.container}>
              <div className={addtasks.tesks}>
                <label htmlFor="terefa">Sua Tarefa</label>
                <input
                  id="value"
                  onKeyDown={handleOnKeyDonw}
                  type="text"
                  placeholder="Criar Tarefas"
                />
              </div>
              <div className={addtasks.tesks}>
                <label htmlFor="date">Data</label>
                <input onChange={handleOnDateChange} value={selectdDate} type="date" placeholder="Date" />
              </div>
              <div className={addtasks.buttons}>
                <Button
                  handleClickButton={handleOnClickButton}
                  title="Criar Tarefa"
                />
                <Button handleClickButton={onClickBottun} title="Editar Tarefa" />
              </div>
            </div>
          </div>
        </main>
        <Drawer placement="left" onClose={onCloseDrawer} isOpen={isOpenD}>
          <DrawerOverlay />
          <DrawerContent style={{ background: '#B4ACF9' }}>
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
