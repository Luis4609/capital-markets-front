import { NextPage } from "next";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Checkbox, FormControl, FormControlLabel, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { UserSubmitForm } from "../types/user";

const RegisterPage: NextPage = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
    router.push("/");
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
        Register
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="fullname"
          label="Full Name"
          variant="outlined"
          margin="normal"
          {...register("fullname")}
          error={errors.fullname ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.fullname?.message}
        </Typography>

        <TextField
          id="password"
          label="Username"
          variant="outlined"
          margin="normal"
          {...register("username")}
          error={errors.username ? true : false}
        />

        <Typography variant="inherit" color="textSecondary">
          {errors.fullname?.message}
        </Typography>

        <TextField
          id="outlined-basic"
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
          id="outlined-basic"
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

        <TextField
          id="outlined-basic"
          label="Confirm Password"
          type="password"
          variant="outlined"
          margin="normal"
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.confirmPassword?.message}
        </Typography>
        <FormControl>
          <FormControlLabel
            control={<Checkbox />}
            label=" I have read and agree to the Terms"
            {...label}
            {...register("acceptTerms")}
          />
        </FormControl>
        <Typography variant="inherit" color="textSecondary">
          {errors.acceptTerms?.message}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            // endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => reset()}
            // endIcon={<KeyboardArrowRightIcon />}
          >
            Reset
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default RegisterPage;
