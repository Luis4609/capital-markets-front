import { ReactElement, useContext } from "react";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";

import { UserLoginSubmitForm } from "../types/user";
import { NextPageWithLayout, UserContext } from "./_app";

import { validationSchemaLogin } from "../validators/schema";

import styles from "../styles/Login.module.css";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { user, setUser }: any = useContext(UserContext);

  console.log(`User: ${user}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSubmitForm>({
    resolver: yupResolver(validationSchemaLogin),
  });

  const onSubmit = (data: UserLoginSubmitForm) => {
    console.log("JSON FROM: " + JSON.stringify(data, null, 2));

    setUser(JSON.stringify(data, null, 2));

    //Request BACK-END ENDPOINT
    fetch("http://192.168.97.2:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Content-Length": "512",
      },
      body: JSON.stringify(data, null, 2),
      credentials: "same-origin",
      mode: "no-cors",
      cache: "no-cache",
      referrerPolicy: "no-referrer",
    })
      .then((res) => console.log("RESPUESTA DEL POST: " + res))
      .catch((res) => console.log("FALLO EN LA REQUEST: " + res));

    router.push("/");
  };

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

        <Stack direction="column" spacing={2}>
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
