import { DashboardHeader, Menu } from "../../components";
import { Avatar, Flex, Box, Text, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, DrawerBody} from "@chakra-ui/react";
import './profileHeaderTest.css'

import profile from "./profile.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { ITarefa } from "../../utils";
import dataBase from "../../server/bancoDeDados";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [taskTotal, setCompletedTasks] = useState(0)
  const [noCompleted, setnoCompleted] = useState(0)
  const [taks , setTasks] = useState<ITarefa[]>([])

  const { user, logout } = useAuth();

  const userId = user?.uid

  useEffect(() => {
    document.title = "Perfil"
    if (userId) {
      dataBase.buscarTarefas(userId)
        .then((tak) => setTasks(tak))
        setCompletedTasks(taks.filter(task => task.isSelect).length);
        setnoCompleted(taks.filter(task => !task.isSelect).length);
    }
  })

  


  const onClose = () => {
    setIsOpen(false)
  }
  const onOpen = () => {
    setIsOpen(true)
  }

  
  const photoURL = localStorage.getItem('photoURL')
  const displayName = localStorage.getItem('displayName')

  return (
    <>
      <DashboardHeader onOpen={onOpen}></DashboardHeader>
      <Box className={profile.main}>
        <Box className={profile.avatar}>
          <Flex flexDir={"column"} gap={"10px"} align={'center'}>
            <Avatar w={"7em"} h={"7em"} cursor={"pointer"} src={user?.photoURL ?? photoURL ?? ""} />
            <Text color={'#B4ACF9'} fontSize={'1.5rem'}>{user?.displayName ?? displayName}</Text>
          </Flex>
        </Box>
        <Box className={profile.container}>
          <Box
          className={profile.container_info}
            w={"200px"}
            h={"200px"}
            bgColor={"#363041"}
            borderRadius={"10px"}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            fontWeight={'bold'}
          >
            <Flex flexDir={'column'} align={'center'} justify={'center'}>
              <Text>TOTAL DE TAREFAS</Text>
              <Text color={'#B4ACF9'} fontSize={'2.5rem'}>{ taks.length }</Text>
            </Flex>
          </Box>
          <Box
          className={profile.container_info}
            w={"200px"}
            h={"200px"}
            bgColor={"#363041"}
            borderRadius={"10px"}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            fontWeight={'bold'}
          >
            <Flex flexDir={'column'} align={'center'} justify={'center'}>
              <Text>TAREFAS CONCLUÍDAS</Text>
              <Text color={'#B4ACF9'} fontSize={'2.5rem'}>{taskTotal}</Text>
            </Flex>
          </Box>
          <Box
          className={profile.container_info}
            w={"200px"}
            h={"200px"}
            bgColor={"#363041"}
            borderRadius={"10px"}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            fontWeight={'bold'}
          >
            <Flex flexDir={'column'} align={'center'} justify={'center'}>
              <Text>NÃO CONCLUÍDAS</Text>
              <Text color={'#B4ACF9'} fontSize={'2.5rem'}>{noCompleted}</Text>
            </Flex>
          </Box>
        </Box>
        <Box>
            <Button className={profile.button} onClick={logout}>Sair</Button>
        </Box>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
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
    </>
  );
};
