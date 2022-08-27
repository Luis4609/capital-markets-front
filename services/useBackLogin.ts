import useStorage from "hooks/useStorage";
import router from "next/router";
import toast from "react-hot-toast";
import { API_BACK_LOGIN } from "utils/urls";

export const useFetchLoginBack = ({ user }: any) => {
  const { setItem } = useStorage();

  fetch(API_BACK_LOGIN, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("RESPUESTA DEL POST: ", data);
      if (data.mail != null) {
        setItem("userAuth", data.mail, "local");
        router.push("/");
      } else {
        toast.error("Bad credentials!");
      }
    })
    .catch((res) => console.log("FALLO EN LA REQUEST: ", res));
};
