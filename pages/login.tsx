import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";

import { UserLoginSubmitForm } from "../types/user";
import { NextPageWithLayout } from "./_app";

import { validationSchemaLogin } from "../validators/schema";
import { API_BACK_LOGIN } from "../utils/urls";

import styles from "../styles/Login.module.css";

import useStorage from "hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { setItem } = useStorage();

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
        if (data.mail != null) {
          setItem("userAuth", data.mail, "local");
          router.push("/");
        } else {
          toast.error("Bad credentials!");
        }
      })
      .catch((res) => console.log("FALLO EN LA REQUEST: ", res));
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
          <Toaster></Toaster>
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
