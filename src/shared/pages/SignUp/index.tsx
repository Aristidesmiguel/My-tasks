import { Avatar, Box, Button, Flex, FormControl, FormLabel, IconButton, Input, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { MdOutlineAddAPhoto } from 'react-icons/md'

interface IUserDataProps {
  name: string;
  email: string;
  password: string;
  file: File | undefined;
}

export const SignUp = () => {
  const [photoURL, setPhotoURL] = useState('')
  const [userData, setUserData] = useState<IUserDataProps>({
    name: '',
    password: '',
    email: '',
    file: undefined,
  })
  const { entering, signUpWithEmailAndPassword } = useAuth()

  const inputRef = useRef<HTMLInputElement>(null)

  const onOpenChooseImage = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  }

  const onChangeUserData = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value })
  }

  const onClickButton = () => {
      if (userData.email === "" || userData.name === "" || userData.password === "" || userData.file === undefined) {
        return
      } else {
        onSubmit()
      }
  }


  const onSubmit = async () => {
    //console.log(userData)
    await signUpWithEmailAndPassword(userData)
  }

  const onChooseImage = () => {
    const file = inputRef.current?.files?.[0];
    console.log("FILE: ", file)
    if (file) {
      setUserData({ ...userData, file });
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    document.title = "Criar Conta"
  })



  return (
    <Box
      overflow={"hidden"}
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
            Criar conta
          </Text>
        </Box>
        <form action="" style={{ width: 320 }}>
          <Box  display={"flex"} flexDir={"column"}>
          <FormControl marginBottom={'1rem'} className="fromControl">
            <FormLabel >Nome de usuário</FormLabel>
            <Input value={userData.name} onChange={(e) => onChangeUserData("name", e.target.value)} color={'white'} />
          </FormControl>
          <FormControl marginBottom={'1rem'} className="fromControl">
            <FormLabel >Email</FormLabel>
            <Input value={userData.email} onChange={(e) => onChangeUserData("email", e.target.value)} color={'white'} />
          </FormControl>
          <FormControl marginBottom={'1rem'} className="fromControl">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={userData.password} onChange={(e) => onChangeUserData("password", e.target.value)} color={'white'} />
          </FormControl >
          </Box>  
          <FormControl display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <input type="file" name="" onChange={onChooseImage} ref={inputRef} accept="image/*" hidden id="" />
            {
              photoURL ?
                <Avatar src={photoURL} onClick={onOpenChooseImage} cursor={"pointer"} />
                :
                <>
                  <IconButton
                    w={50}
                    h={50}
                    isRound={true}
                    variant='solid'
                    aria-label='Done'
                    fontSize='20px'
                    onClick={onOpenChooseImage}
                    icon={<MdOutlineAddAPhoto />}
                  />
                </>
            }
          </FormControl>
          <FormControl mt={5}>
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'space-around'} h={'120px'} >
              <Button isLoading={entering} onClick={onClickButton} bgColor={"#B4ACF9"} color={"none"} w={"20em"}>
                Criar
              </Button>
              <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Text>Já possuí uma conta? <Link to={"/sign-in"}>Entrar</Link></Text>
              </Box>
            </Box>
          </FormControl>
        </form>
      </Flex>
    </Box>
  )
}