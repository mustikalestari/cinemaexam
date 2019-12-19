const INITAL_STATE = {
  id: "",
  username: "",
  password: "",
  login: false,
  error: "",
  loading: false,
  role: "",
  totalharga:0
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, ...action.payload, login: true };
    case "LOGIN_LOADING":
      return { ...state, loading: true, error: "" };
    case "LOGIN_ERROR":
      return { ...state, error: action.payload, loading: false };
    case 'CHANGE_PASS':
      return {...state,...action.payload}
      case 'TOTAL_HARGA':
        return {...state,totalharga:action.payload}
    default:

      return state;
  }
};
