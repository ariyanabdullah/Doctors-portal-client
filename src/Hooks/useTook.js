import { useEffect, useState } from "react";

const useTook = (email) => {
  const [utoken, setUtoken] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("token", data.accessToken);
            setUtoken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [utoken];
};

export default useTook;
