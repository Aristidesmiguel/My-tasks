import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { useAuth } from "../../hooks";
import { } from "firebase/auth";
import { Menu } from "../../components";
import "./style.css";
import { useState } from "react";
import { ToastStatus } from "../../utils";
export const SignIn = () => {
  const navigate = useNavigate();
  const [isOpenM, setIsOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onCloseM = () => {
    setIsOpen(false);
  };
  
  
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }


  const { loginWithGoogle, loginWithEmail, entering } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/find-task");
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  /* const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await handleLogin()
  }; */

  const onClickButton = async () => {
    /* createUser.resgistrarUser(email, password) */
    loginWithEmail(email, password)
      .then(() => showToast('Usuário(a), criado com sucesso', 'success'))
      .catch((error) => {
        console.error(error);
        showToast('Aconteceu um erro ao tentar registrar o usuário', 'error')
      });
  }

  const toast = useToast();
  const showToast = (title: string, status: ToastStatus) => {
    toast({
      title: title,
      position: "top-right",
      isClosable: true,
      status: status,
    });
  }

  return (
    <>
      {/* <DashboardHeader onOpen={onOpenM}></DashboardHeader> */}
      <Box
        h={"100vh"}
        display={"flex"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex flexDir={"column"} alignItems={"center"} gap={"1rem"}>
          <Box>
            <Text
              as={"h1"}
              color={"#B4ACF9"}
              fontSize={"2rem"}
              textTransform={"uppercase"}
            >
              Entrar
            </Text>
          </Box>
          <form action="" /* onSubmit={handleSubmit} */ style={{ width: 320 }}>
            <FormControl className="fromControl">
              <FormLabel >Email</FormLabel>
              <Input value={email} onChange={onChangeEmail} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl className="fromControl">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={onChangePassword} />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
            </FormControl>
            <FormControl mt={5}>
              <Box display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'space-around'} h={'120px'} >
                <Button  isLoading={entering} onClick={onClickButton} bgColor={"#B4ACF9"} color={"none"} w={"20em"}>
                  Entrar
                </Button>
                <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                  <Text>Ainda não tem uma conta? <Link to={"/sign-up"}>Criar conta</Link></Text>
                </Box>
                <Text>------ ou ------</Text>
                <Button
                  type="button"
                  onClick={handleLogin}
                  leftIcon={<BsGoogle />}
                  w={"full"}
                >
                  Entrar com a Google
                </Button>
              </Box>
            </FormControl>
          </form>
        </Flex>
      </Box>
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
    </>
  );
};
