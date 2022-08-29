import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactElement } from "react";
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

import useStorage from "hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "components/Navbar";
import NavbarLogin from "components/NavbarLogin";
import { API_BACK_LOGIN } from "utils/urls";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { getItem, setItem } = useStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSubmitForm>({
    resolver: yupResolver(validationSchemaLogin),
  });

  const onSubmit = async (data: UserLoginSubmitForm) => {
    fetch(API_BACK_LOGIN, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.mail != null) {
          console.log("RESPUESTA DEL POST: ", data);
          setItem("userAuth", data.mail, "local");
          router.push("/");
        } else {
          toast.error("Email or password are invalid");
        }
      })
      .catch((res) => console.log("FALLO EN LA REQUEST: ", res));
  };

  return (
    <div className={styles.login}>
      <Typography variant="h5" color="textPrimary" component="h2" gutterBottom>
        Login
      </Typography>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <TextField
          id="mail"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
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
          variant="outlined"
          margin="normal"
          fullWidth
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
      <NavbarLogin></NavbarLogin>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default LoginPage;
