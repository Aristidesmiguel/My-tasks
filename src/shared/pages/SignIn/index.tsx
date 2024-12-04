import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { BsGoogle } from 'react-icons/bs'

import { useAuth } from '../../hooks';
import { } from 'firebase/auth';

export const SignIn = () => {
  const navigate = useNavigate();

  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/find-task")
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  /* const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await handleLogin()
  }; */

  return (
    <Box h={"100vh"} display={"flex"} w={"100%"} alignItems={"center"} justifyContent={"center"}>
      <form action="" /* onSubmit={handleSubmit} */ style={{ width: 320 }}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type='password' />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
        <FormControl mt={5}>
          <Button type='button' onClick={handleLogin} leftIcon={<BsGoogle />} w={"full"}>
            Entrar com a Google
          </Button>
        </FormControl>
      </form>
    </Box>
  )
}
