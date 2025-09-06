import { useLocation } from "react-router";
import Bg from "../assets/pattern-ticket.svg"
import Logo from "../assets/logo-full.svg"

function Ticket() {
    const location = useLocation();
    const { avatar, fullname, email, username } = location.state || {}

    console.log("Bg URL:", Bg);


    return (
        
        <div className="flex flex-col items-center justify-center gap-10 text-white text-center my-10 mx-auto">
            <img src={Logo} alt="" className="" />
            <div className="flex flex-col gap-4 items-center justify-center w-[70%]">
                <h1 className="text-3xl">
                    Congrats, <span className="font-bold bg-gradient-to-r from-[hsl(7,86%,67%)] to-[hsl(0,0%,100%)] bg-clip-text text-transparent">{fullname}!</span> Your ticket is ready.
                </h1>
                <p className="text-xl">We've emailed your ticket to <span className="text-[var(--orange-500)]">{email}</span> and will send updates
                    in the run up to the event</p>
            </div>


            {/* <div
                    className=" relative w-[400px] h-[300px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center"
                    style={{ backgroundImage: `url(${Bg})` }}
                >
                    <img src={Logo} alt="" className="w-[100px]" />
                     <div className="">
                        {avatar && <img src={avatar} alt={username} />}
                        <p className="">
                            {fullname}{username}
                        </p>

                     </div>

                </div> */}


            <div className="relative w-[70%] h-[200px] flex items-center justify-center mx-auto">
                <img
                    src={Bg}
                    alt="ticket background"
                    className="absolute inset-0 w-full h-full object-contain"
                />
                <div className="relative z-10 flex flex-col items-center gap-5">
                    <img src={Logo} alt="Logo" className="w-[100px] mb-4" />
                    <div className="flex gap-5">
                        {avatar && <img src={avatar} alt={username} />}
                    <div className="flex flex-col items-center justify-center">
                    <p>{fullname} </p>
                    <p className="">{username}</p>

                    </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )

}

export default Ticket