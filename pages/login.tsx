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

import { API_BACK_LOGIN } from "../utils/urls";
import { validationSchemaLogin } from "../validators/schema";

import styles from "../styles/Login.module.css";

import useStorage from "hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";

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

  const onSubmit = (data: UserLoginSubmitForm) => {
    console.log("JSON FROM: " + JSON.stringify(data, null, 2));

    if (getItem("userAuth", "local")) {
      router.push("/");
    }else{
      toast.error("Email or password are invalid")
    }
  };

  return (
    <div className={styles.login}>
      <Typography variant="h5" color="textPrimary" component="h2" gutterBottom>
        Login
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default LoginPage;
