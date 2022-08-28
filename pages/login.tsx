import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
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
import { supabase } from "../utils/supabaseClient";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<any>(true);
  const [session, setSession] = useState<any>(null);

  const { getItem, setItem } = useStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginSubmitForm>({
    resolver: yupResolver(validationSchemaLogin),
  });

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    }

    getInitialSession();

    const { subscription }: any = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);

  const onSubmit = async (data: UserLoginSubmitForm) => {
    console.log("JSON FROM: " + JSON.stringify(data, null, 2));

    // if (getItem("userAuth", "local")) {
    //   router.push("/");
    // } else {
    //   toast.error("Email or password are invalid");
    // }
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: data.mail,
      });
      // const { error } = await supabase.auth.signInWithPassword({
      //   email: data.mail,
      //   password: data.password,
      // });

      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error?.error_description || error?.message);
    } finally {
      setIsLoading(false);
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
