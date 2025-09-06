import '../index.css';
import Logo from '../assets/logo-full.svg'
import { useState, useReducer } from 'react';
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
    const [dragOver, setDragOver] = useState(false);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            dispatch({ type: "SET_AVATAR", payload: e.target.files[0] });
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            dispatch({ type: "SET_AVATAR", payload: e.dataTransfer.files[0] });
        }
    }


        return (
            <>
                <section className="flex items-center justify-center flex-col h-screen mx-8 my-auto p-4 text-white">

                    <img src={Logo} alt="Logo" />
                    <h1 className="text-4xl font-semibold text-center py-2">Your Journey to Coding Conf 2025 Starts Here!</h1>
                    <p className='text-lg'>Secure your spot at next year's biggest coding conference</p>
                    <form onSubmit={handleSubmit} className='my-10'>
                        <label htmlFor="file" className='my-2'>Upload Avatar </label>

                            <div
                                className={`border-2 rounded-md mt-2 p-6 w-full text-center transition ${dragOver ? "border-orange-500 bg-orange-50" : "border-dashed border-gray-400"
                                    }`}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOver(true);
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                            >

                            {state.avatar ? (
                                <div className="text-green-600">
                                    File selected: {state.avatar.name}</div>
                               ) : (
                               <div
                                    className='border-[var(--neutral-700)] mt-2 mx-auto p-4 w-[100%]'
                                >
                                    <img src={Upload} alt="" className='mx-auto' />
                                    <p className="">Drag and drop or click to upload</p>
                                </div>
                            )}
                            </div>
                        
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

                        <button type='submit' className='font-bold text-[16px]'>Generate My Ticket</button>

                    </form>
                </section>
            </>
        )
    }

    export default Form