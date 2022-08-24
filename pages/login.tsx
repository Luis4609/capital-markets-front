import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactElement, useContext, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";

import { UserLoginSubmitForm } from "../types/user";
import { NextPageWithLayout } from "./_app";

import { validationSchemaLogin } from "../validators/schema";

import styles from "../styles/Login.module.css";
import { API_BACK_LOGIN } from "../utils/urls";
import { UserContext } from "context/AuthUserContext";
import useAppContext from "context/AppContext";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  // const { user, login } = useContext(UserContext);
  // const [name, setName] = useState();

  // const { variableState, setVariableState } = useAppContext();
  // console.log(`%cContext user: ${variableState.name}`, "color: red;");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSubmitForm>({
    resolver: yupResolver(validationSchemaLogin),
  });

  const onSubmit = (data: UserLoginSubmitForm) => {
    console.log("JSON FROM: " + JSON.stringify(data, null, 2));

    // setUser(JSON.stringify(data, null, 2));

    //Request BACK-END ENDPOINT
    fetch(API_BACK_LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("RESPUESTA DEL POST: ", data);
        //setName((prev) => data.mail);
        // login(data.mail);
        // setVariableState({name: data.mail, auth: true})
      })
      .catch((res) => console.log("FALLO EN LA REQUEST: ", res));

    router.push("/");
  };

  const { variableState, setVariableState } = useAppContext();
  console.log(`%cContext user: ${variableState.name}`, "color: red;");

  // console.log(`CONTEXT: ${user.name} + state: ${name}`);

  return (
    <div className={styles.main}>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Login
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="mail"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          margin="normal"
          {...register("mail")}
          error={errors.mail ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.mail?.message}
        </Typography>

        <TextField
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          {...register("password")}
          error={errors.password ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.password?.message}
        </Typography>

        <Stack direction="column" spacing={2} mt={2}>
          <Button type="submit" color="primary" variant="contained">
            Continue
          </Button>

          <Button
            color="secondary"
            variant="outlined"
            onClick={() => router.push("/register")}
          >
            Create new account
          </Button>
        </Stack>
      </form>
    </div>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default LoginPage;
