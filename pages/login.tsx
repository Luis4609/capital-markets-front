import { NextPageWithLayout } from "./_app";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Footer from "../components/Footer";
import Layout from "../components/Layout/layout";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { UserLoginSubmitForm } from "../types/user";

import { validationSchemaLogin } from "../validators/schema";
import { ReactElement } from "react";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSubmitForm>({
    resolver: yupResolver(validationSchemaLogin),
  });

  const onSubmit = (data: UserLoginSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
    router.push("/");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          {...register("email")}
          error={errors.email ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.email?.message}
        </Typography>

        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          {...register("password")}
          error={errors.password ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.password?.message}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </Stack>
      </form>
    </Container>
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
