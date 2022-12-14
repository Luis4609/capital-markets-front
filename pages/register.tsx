import { useRouter } from "next/router";
import { ReactElement } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button, Stack, TextField, Typography } from "@mui/material";

import { UserSubmitForm } from "../types/user";
import { validationSchemaRegister } from "../validators/schema";

import Footer from "components/Footer";
import Layout from "components/Layout/layout";
import useStorage from "hooks/useStorage";
import toast, { Toaster } from "react-hot-toast";

import styles from "../styles/Login.module.css";
import { API_BACK_REGISTER, API_DUMMY_JSON_USERS_ADD_URL } from "../utils/urls";
import { NextPageWithLayout } from "./_app";
import NavbarLogin from "components/NavbarLogin";

const RegisterPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setItem } = useStorage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchemaRegister),
  });

  const onSubmit = (data: UserSubmitForm) => {
    // fetch(API_BACK_REGISTER, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.mail != null) {
    //       console.log("RESPUESTA DEL POST: ", data);
    //       setItem("userAuth", data.mail, "local");
    //       router.push("/");
    //     } else {
    //       toast.error("Bad credentials!");
    //     }
    //   })
    //   .catch((res) => console.log("FALLO EN LA REQUEST: ", res));

    fetch(API_DUMMY_JSON_USERS_ADD_URL, {
      method: "POST",
      body: JSON.stringify({
        firstName: data.name,
        lastName: data.surname,
        email: data.mail,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItem("userAuth", data.email, "local");
        router.push("/");
      })
      .catch((res) => console.log("FALLO EN LA REQUEST: ", res));
  };

  return (
    <div className={styles.register}>
      <Typography variant="h5" color="textPrimary" component="h2" gutterBottom>
        Register
      </Typography>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("name")}
          error={errors.name ? true : false}
        />
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "rgb(240, 87, 87)" }}
        >
          {errors.name?.message}
        </Typography>

        <TextField
          id="surname"
          label="Surname"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("surname")}
          error={errors.surname ? true : false}
        />

        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "rgb(240, 87, 87)" }}
        >
          {errors.surname?.message}
        </Typography>

        <TextField
          id="dni"
          label="DNI"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("dni")}
          error={errors.dni ? true : false}
        />

        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "rgb(240, 87, 87)" }}
        >
          {errors.dni?.message}
        </Typography>
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("mail")}
          error={errors.mail ? true : false}
        />
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "rgb(240, 87, 87)" }}
        >
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
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "rgb(240, 87, 87)" }}
        >
          {errors.password?.message}
        </Typography>
        <TextField
          id="confirm-password"
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
        />
        <Typography
          variant="inherit"
          color="textSecondary"
          sx={{ color: "rgb(240, 87, 87)" }}
        >
          {errors.confirmPassword?.message}
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-start"
          alignItems="center"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          mt={2}
        >
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Register
          </Button>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-start"
          alignItems="center"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          mt={2}
        >
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => reset()}
          >
            Reset
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            fullWidth
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Toaster></Toaster>
        </Stack>
      </form>
    </div>
  );
};

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <NavbarLogin></NavbarLogin>
      {page}
      <Footer></Footer>
    </Layout>
  );
};

export default RegisterPage;
