import { Typography } from "@mui/material";
import { Container } from "@mui/system";

import { red } from "@mui/material/colors";
import Link from "next/link";

const Error = ({ statusCode }) => {
  return (
    <Container>
      {statusCode ? (
        <Typography variant="h5" sx={{ color: red[500] }}>
          An error {statusCode} ocurred on the server
        </Typography>
      ) : (
        <>
          <Typography variant="h5" sx={{ color: red[500] }}>
            An error occurred on the client
          </Typography>
          <Link to="/">Go back</Link>
        </>
      )}
    </Container>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
