import Axios from "axios";
import { APIURL } from "../../support/apiUrl";
export const LoginSuccessAction = datauser => {
  return {
    type: "LOGIN_SUCCESS",
    payload: datauser
  };
};

export const gantiPassword=(newpass)=>{
  return{
    type: 'CHANGE_PASS',
    payload:newpass
  }
}

export const totalHargaACtion=(price)=>{
  return{
      type:'TOTAL_HARGA',
      payload:price
  }
}
export const Loginthunk = (username, password) => {
  return dispatch => {
    dispatch({ type: "LOGIN_LOADING" });
    Axios.get(`${APIURL}users?username=${username}&password=${password}`)
      .then(res => {
        if (res.data.length) {
          localStorage.setItem("tari", res.data[0].id);
          dispatch(LoginSuccessAction(res.data[0]));
        } else {
          dispatch({ type: "LOGIN_ERROR", payload: "Password Anda salah :)" });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "LOGIN_ERROR", payload: "Server Error" });
      });
  };
};

export const Login_error = () => {
  return dispatch => {
    dispatch({ type: "LOGIN_ERROR", payload: "" });
  };
};
