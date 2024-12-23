import {
  Button,
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

import { DashboardHeader, Menu, TaskItem } from "../../components";
import { collection, getDocs, query } from "firebase/firestore";
import dashboardCss from "./dashboard.module.css";
import dataBase from "../../server/bancoDeDados";
import { COLLECTION_NAME, ITarefa, ToastStatus } from "../../utils";
import { db } from "../../services/firebase";
import { useAuth } from "../../hooks";

export const Dashboard = () => {
  const [isOpenM, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState<ITarefa[]>([]);
  const [isOpenD, setIsOpenD] = useState(false);
  const [value, setValue] = useState('')
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { user } = useAuth()
  const userId = user?.uid

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClickButton_TaskRemove = () => {
    if (selectedTaskId !== null) {
      setIsDeleting(true);
      dataBase.removeTarefa(selectedTaskId)
        .then(() => {
          setTasks(tasks.filter((item) => item.id !== selectedTaskId));
          showToast("Tarefa Eliminada", 'info')
          setIsOpenD(false);
        })
        .catch(() => {
          showToast("Erro ao eliminar a tarefa", 'error')
        })
        .finally(() => setIsDeleting(false))

      /* setTimeout(() => {
        setTasks(tasks.filter((item) => item.id !== selectedTaskId));
        showToast("Tarefa Eliminada", 'info')
      }, 1000); */

    }
  };

  const onChoseD = () => {
    setIsOpenD(false);
  };
  const onOpenD = () => {
    setIsOpenD(true);
    getTasks()
  };

  const getTasks = async () => {
    const q = query(collection(db, COLLECTION_NAME));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      setSelectedTaskId(doc.id);
    });
  }

  const onCloseM = () => {
    setIsOpen(false);
  };
  const onOpenM = () => {
    setIsOpen(true);
  };
  const handleToggleComplete = async (task: ITarefa) => {

    //Atualizando o toast de acordo com a atualização do estado da tarefa

    /* 
      toast.promise => é uma função que espera dois paramêtros      
        primeiro - promise(ou seja, uma promessa de que algo vai acontecer)
        segundo - um objecto que fica monitorando a promessa
      */
    /**
 * Atualiza o estado de conclusão de uma tarefa no banco de dados e exibe notificações
 * usando o método toast.promise para acompanhar o processo assíncrono.
 */
    toast.promise(
      // Chama o método que altera o estado da tarefa no banco de dados
      dataBase.isCompled(task.id, !task.isSelect), // task.id é o ID da tarefa; !task.isSelect inverte o estado atual
      {
        // Configuração da mensagem exibida em caso de sucesso
        success: {
          title: "Tarefa atualizada com sucesso",
        },
        // Configuração da mensagem exibida em caso de erro
        error: {
          title: "A tarefa não foi atualizada",
        },
        loading: {
          title: "Atualizando...",
          position: "top-right",
          // Esta mensagem é exibida enquanto o método dataBase.isCompled está sendo executado
        },
      }
    );

    // Atualiza o estado da tarefa no componente(algo semelhante ao que fizeste);
    const newTasks = tasks.map(taskMaped => taskMaped.id === task.id ? { ...task, isSelect: !task.isSelect } : taskMaped)
    setTasks(newTasks)
  };
  useEffect(() => {
   if (userId){
      dataBase.buscarTarefas(userId).then((tasks) => setTasks(tasks));
   }
  }, [userId]);

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
                onClick={handleClickButton_TaskRemove}
                value={"Eliminar"}
                isLoading={isDeleting}
                color={"white"}
                loadingText="Eliminando..."
              >Eliminar</Button>
              <Button onClick={onChoseD} disabled={isDeleting}>Cancelar</Button>
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
                      <TaskItem handleToggleComplete={() => handleToggleComplete(task)} onOpenD={onOpenD} task={task} />
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
