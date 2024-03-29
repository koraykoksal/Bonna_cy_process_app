import React from 'react'
import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import image from "../assets/result.svg"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Formik, Form } from "formik"
import { object, string } from "yup"
import useAuthCall from '../hooks/useAuthCall'
import { useState } from 'react'


const Login = () => {


  const [info, setInfo] = useState({
    email: "",
    password: ""
  })

  const { login, signIn } = useAuthCall()

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    // signIn(info)
    login(info)

    setInfo({
      username: "",
      password: ""
    })
  }


  return (

    <Container maxWidth="lg" >

      <Typography variant='h4' align='center' p={3} fontWeight={700} color='#BA68C8'>Bonna Çayırova Proses</Typography>

      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >



        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Giriş
          </Typography>


          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} component='form' onSubmit={handleSubmit}>

            <TextField
              required
              label="Kullanıcı Adı"
              name="username"
              id="username"
              type="text"
              variant="outlined"
              value={info.username}
              onChange={handleChange}
            />
            <TextField
              required
              label="Şifre"
              name="password"
              id="password"
              type="password"
              variant="outlined"
              value={info.password}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" sx={{ letterSpacing: 5, textTransform: 'none', fontWeight: 700 }}>
              Giriş
            </Button>

          </Box>


        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>

  )
}

export default Login