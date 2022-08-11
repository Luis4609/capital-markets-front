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
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-start"
          alignItems="center"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          mt={2}
        >
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default RegisterPage;
