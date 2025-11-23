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
import {} from "firebase/auth";
import { Menu } from "../../components";
import "./style.css";
import { useEffect, useState } from "react";
import { ToastStatus } from "../../utils";

export const SignIn = () => {
  const navigate = useNavigate();
  const [isOpenM, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginWithGoogle, loginWithEmail, entering } = useAuth();

  const onCloseM = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.title = "Entrar";
  });

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(`/find-task`);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const onClickButton = () => {
    if (email === "" || password === "") {
      showToast("Campo vazio", "info");
    } else {
      login();
    }
  };

  const login = async () => {
    loginWithEmail(email, password)
      .then(() => showToast("Usuário(a) encontrado", "success"))
      .catch((error) => {
        console.error(error);
        showToast("Usuário(a), Não encontrado", "error");
      });
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
            <Box display={"flex"} flexDir={"column"} gap={"2rem"}>
              <FormControl className="fromControl">
                <FormLabel>Email</FormLabel>
                <Input value={email} onChange={onChangeEmail} color={"white"} />
              </FormControl>
              <FormControl className="fromControl">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                  color={"white"}
                />
              </FormControl>
            </Box>
            <FormControl mt={8} mb={8}>
              <Box
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"space-around"}
                h={"120px"}
              >
                <Button
                  isLoading={entering}
                  onClick={onClickButton}
                  bgColor={"#B4ACF9"}
                  color={"none"}
                  w={"20em"}
                >
                  Entrar
                </Button>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Text>
                    Ainda não tem uma conta?{" "}
                    <Link to={"/sign-up"}>Criar conta</Link>
                  </Text>
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
