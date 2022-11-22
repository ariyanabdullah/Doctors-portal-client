import { useEffect, useState } from "react";

const UseAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/users/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.IsAdmin);
      });
  }, [email]);

  return [isAdmin];
};

export default UseAdmin;
