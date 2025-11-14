import '../index.css';
import Logo from '../assets/logo-full.svg';
import Upload from "../assets/icon-upload.svg";
import { useReducer } from 'react';
import { useNavigate } from 'react-router';

function Form() {
  const navigate = useNavigate();

  // -------------------- Types --------------------
  type State = {
    avatar: File | null;
    fullname: string;
    email: string;
    username: string;
    errors: {
      avatar?: string;
      fullname?: string;
      email?: string;
      username?: string;
    };
  };

  type Action =
    | { type: "SET_AVATAR"; payload: File | null }
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_USERNAME"; payload: string }
    | { type: "SET_ERROR"; field: keyof State["errors"]; message: string | undefined }
    | { type: "RESET" };

  const initialState: State = {
    avatar: null,
    fullname: "",
    email: "",
    username: "",
    errors: {},
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "SET_AVATAR":
        return { ...state, avatar: action.payload, errors: { ...state.errors, avatar: undefined } };
      case "SET_NAME":
        return { ...state, fullname: action.payload, errors: { ...state.errors, fullname: undefined } };
      case "SET_EMAIL":
        return { ...state, email: action.payload, errors: { ...state.errors, email: undefined } };
      case "SET_USERNAME":
        return { ...state, username: action.payload, errors: { ...state.errors, username: undefined } };
      case "SET_ERROR":
        return { ...state, errors: { ...state.errors, [action.field]: action.message } };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // -------------------- Handlers --------------------
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch({ type: "SET_AVATAR", payload: e.target.files[0] });
    }
  };

  const handleRemoveImage = () => {
    dispatch({ type: "SET_AVATAR", payload: null });
  };

  const validateForm = () => {
    let valid = true;

    if (!state.avatar) {
      dispatch({ type: "SET_ERROR", field: "avatar", message: "Please upload an avatar" });
      valid = false;
    }

    if (!state.fullname.trim()) {
      dispatch({ type: "SET_ERROR", field: "fullname", message: "Full name is required" });
      valid = false;
    }

    if (!state.email.trim()) {
      dispatch({ type: "SET_ERROR", field: "email", message: "Email is required" });
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      dispatch({ type: "SET_ERROR", field: "email", message: "Invalid email format" });
      valid = false;
    }

    if (!state.username.trim()) {
      dispatch({ type: "SET_ERROR", field: "username", message: "Username is required" });
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const url = URL.createObjectURL(state.avatar!);

    navigate('/ticket', {
      state: {
        avatar: url,
        fullname: state.fullname,
        email: state.email,
        username: state.username
      }
    });
  };

  // -------------------- JSX --------------------
  return (
    <section className="flex items-center justify-center flex-col min-h-screen mx-8 my-10 p-4 text-white">
      <img src={Logo} alt="Logo" className='mt-8' />
      <h1 className="text-4xl font-semibold text-center py-2">
        Your Journey to Coding Conf 2025 Starts Here!
      </h1>
      <p className='text-lg'>Secure your spot at next year's biggest coding conference</p>

      <form onSubmit={handleSubmit} className='my-10 w-full max-w-md flex flex-col gap-4'>

        {/* Avatar Upload */}
        <label htmlFor="file" className='my-2 cursor-pointer'>
          Upload Avatar
          {state.avatar ? (
            <div className="text-orange-400 text-lg border-[var(--neutral-700)] border-2 rounded-md border-dashed mt-2 p-4 flex flex-col gap-2">
              <span>File selected: {state.avatar.name}</span>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-[hsl(245,19%,25%)] py-1 px-4 rounded-lg cursor-pointer"
                >
                  Remove Image
                </button>
                <label
                  htmlFor="file"
                  className="bg-[hsl(245,19%,25%)] py-1 px-4 rounded-lg cursor-pointer"
                >
                  Change Image
                </label>
              </div>
            </div>
          ) : (
            <div className='border-[var(--neutral-700)] border-2 rounded-md border-dashed mt-2 p-4 text-center'>
              <img src={Upload} alt="" className='mx-auto' />
              <p>Drag and drop or click to upload</p>
            </div>
          )}
          {state.errors.avatar && <p className="text-orange-400 mt-1">{state.errors.avatar}</p>}
        </label>
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className='hidden'
        />

        {/* Full Name */}
        <label htmlFor="fullname">Full Name</label>
        <input
          id='fullname'
          type="text"
          value={state.fullname}
          onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
          className="p-2 rounded-md text-black w-full"
        />
        {state.errors.fullname && <p className="text-orange-400">{state.errors.fullname}</p>}

        {/* Email */}
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          value={state.email}
          onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
          placeholder='example@email.com'
          className="p-2 rounded-md text-black w-full"
        />
        {state.errors.email && <p className="text-orange-400">{state.errors.email}</p>}

        {/* GitHub Username */}
        <label htmlFor="username">GitHub Username</label>
        <input
          id='username'
          type="text"
          value={state.username}
          onChange={(e) => dispatch({ type: "SET_USERNAME", payload: e.target.value })}
          placeholder='@yourusername'
          className="p-2 rounded-md text-black w-full"
        />
        {state.errors.username && <p className="text-orange-400">{state.errors.username}</p>}

        {/* Submit */}
        <button
          type='submit'
          className='cursor-pointer font-bold text-[16px] w-full bg-[var(--orange-700)] text-[var(--neutral-900)] p-4 rounded-lg mt-4'
        >
          Generate My Ticket
        </button>
      </form>
    </section>
  );
}

export default Form;
