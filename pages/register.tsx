import { NextPage } from "next";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { UserSubmitForm } from "../types/user";
import { schema } from "../validators/schema";

import styles from "../styles/Login.module.css";

const RegisterPage: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
    router.push("/");
  };

  const label = { inputProps: { "aria-label": "Accept Terms" } };

  return (
    <div className={styles.main}>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Register
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="fullname"
          label="Full Name"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("fullname")}
          error={errors.fullname ? true : false}
        />
        <Typography variant="inherit" color="textSecondary" sx={{color: "rgb(240, 87, 87)"}}>
          {errors.fullname?.message}
        </Typography>

        <TextField
          id="username"
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("username")}
          error={errors.username ? true : false}
        />

        <Typography variant="inherit" color="textSecondary" sx={{color: "rgb(240, 87, 87)"}}>
          {errors.username?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("email")}
          error={errors.email ? true : false}
        />
        <Typography variant="inherit" color="textSecondary" sx={{color: "rgb(240, 87, 87)"}}>
          {errors.email?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("password")}
          error={errors.password ? true : false}
        />
        <Typography variant="inherit" color="textSecondary" sx={{color: "rgb(240, 87, 87)"}}>
          {errors.password?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
        />
        <Typography variant="inherit" color="textSecondary" sx={{color: "rgb(240, 87, 87)"}}>
          {errors.confirmPassword?.message}
        </Typography>
        <FormControl fullWidth>
          <FormControlLabel
            control={<Checkbox />}
            label=" I have read and agree to the Terms"
            {...label}
            {...register("acceptTerms")}
          />
        </FormControl>
        <Typography variant="inherit" color="textSecondary" sx={{color: "rgb(240, 87, 87)"}}>
          {errors.acceptTerms?.message}
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
        </Stack>
      </form>
    </div>
  );
};

export default RegisterPage;
