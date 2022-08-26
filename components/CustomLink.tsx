import { Link } from "@mui/material";

interface ICustomLink {
  children: any;
  url: string;
}

const CustomLink = ({ children }: any, url: string | undefined) => {
  console.log("Url del link");

  return <Link color="inherit">{children}</Link>;
};

export default CustomLink;
