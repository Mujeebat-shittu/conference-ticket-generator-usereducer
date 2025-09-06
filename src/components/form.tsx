import '../index.css';
import Logo from '../assets/logo-full.svg'
import {  useReducer } from 'react';
import { useNavigate } from 'react-router';
import Upload from "../assets/icon-upload.svg"

function Form() {
    const navigate = useNavigate();

    type State = {
        avatar: File | null;
        fullname: string;
        email: string;
        username: string;
    }

    type Action =
        | { type: "SET_AVATAR"; payload: File | null }
        | { type: "SET_NAME"; payload: string }
        | { type: "SET_EMAIL"; payload: string }
        | { type: "SET_USERNAME"; payload: string }
        | { type: "RESET"; }


    const initialState: State = {
        avatar: null,
        fullname: "",
        email: "",
        username: "",
    }

    function reducer(state: State, action: Action) {
        switch (action.type) {
            case "SET_AVATAR":
                return { ...state, avatar: action.payload };
            case "SET_NAME":
                return { ...state, fullname: action.payload };
            case "SET_EMAIL":
                return { ...state, email: action.payload };
            case "SET_USERNAME":
                return { ...state, username: action.payload };
            case "RESET":
                return initialState;
            default:
                return state;

        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        navigate('/ticket', {
            state: {
                avatar: state.avatar,
                fullname: state.fullname,
                email: state.email,
                username: state.username
            }
        }

        )
    }
    // const [dragOver, setDragOver] = useState(false);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            dispatch({ type: "SET_AVATAR", payload: e.target.files[0] });
        }
    };


        return (
            <>
                <section className="flex items-center justify-center flex-col h-screen mx-8 my-10 l p-4 text-white">

                    <img src={Logo} alt="Logo" className='mt-8' />
                    <h1 className="text-4xl font-semibold text-center py-2">Your Journey to Coding Conf 2025 Starts Here!</h1>
                    <p className='text-lg'>Secure your spot at next year's biggest coding conference</p>
                    <form onSubmit={handleSubmit} className='my-10'>
                        <label htmlFor="file" className='my-2'>Upload Avatar                             

                            {state.avatar ? (
                                <div className="text-orange-400 text-lg border-[var(--neutral-700)] border-2 rounded-md border-dashed mt-2 mx-auto py-4 px-6 w-[100%]">
                                    File selected: {state.avatar.name}

                                    <div className="text-sm text-[var(--neutral-300)] flex gap-5 items-center justify-center ">
                                        <button className="bg-[hsl(245,19%,25%)] py-1 px-4 my-1 rounded-lg cursor-pointer">Remove Image</button>
                                        <button className="bg-[hsl(245,19%,25%)] py-1 px-4 my-1 rounded-lg cursor-pointer">Change Image</button>
                                    </div>
                                    </div>
                               ) : (
                               <div
                                    className='border-[var(--neutral-700)] border-2 rounded-md border-dashed mt-2 mx-auto p-4 w-[100%]'
                                >
                                    <img src={Upload} alt="" className='mx-auto' />
                                    <p className="">Drag and drop or click to upload</p>
                                </div>
                            )}
                            </label>
                        
                        <input id="file" type="file" required 
                            onChange={handleFileChange}
                            className='hidden'
                        /> <br />
                        <label htmlFor="fullname" className='mt-4 mb-2'>Full Name</label><br />
                        <input id='fullname' type="text" required value={state.fullname}
                            onChange={(e) =>
                                dispatch({ type: "SET_NAME", payload: e.target.value })
                            }

                        /><br /><br />

                        <label htmlFor="email">Email Address</label><br />
                        <input type="email" name="email" id="email" required value={state.email}
                            placeholder='example@email.com'
                            onChange={(e) =>
                                dispatch({ type: "SET_EMAIL", payload: e.target.value })
                            }

                        /><br /><br />

                        <label htmlFor="github">GitHub Username</label><br />
                        <input type="text" id='github' name='github-address'
                            placeholder='@yourusername'
                            required
                            value={state.username}
                            onChange={(e) =>
                                dispatch({ type: "SET_USERNAME", payload: e.target.value })
                            }

                        /><br /><br />

                        <button type='submit' 
                        className='cursor-pointer font-bold text-[16px] w-[100%] bg-[var(--orange-700)] text-[var(--neutral-900)] border-none border-[5px] p-4'
                        > 
                        Generate My Ticket</button>

                    </form>
                </section>
            </>
        )
    }

    export default Form