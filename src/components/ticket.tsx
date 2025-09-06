import { useLocation } from "react-router";
import Bg from "../assets/pattern-ticket.svg"
import Logo from "../assets/logo-full.svg"
import Icon from "../assets/icon-github.svg"

function Ticket() {
    const location = useLocation();
    const { avatar, fullname, email, username } = location.state || {}

    console.log("Bg URL:", Bg);


    return (
        
        <div className="flex flex-col items-center justify-center gap-10 text-[var(--neutral-300)] text-center my-10 mx-auto">
            <img src={Logo} alt="" className="" />
            <div className="flex flex-col gap-4 items-center justify-center w-[70%]">
                <h1 className="text-4xl">
                    Congrats, <span className="font-bold bg-gradient-to-r from-[hsl(7,86%,67%)] to-[hsl(0,0%,100%)] bg-clip-text text-transparent">{fullname}!</span> Your ticket is ready.
                </h1>
                <p className="text-xl">We've emailed your ticket to <span className="text-[var(--orange-500)]">{email}</span> and will send updates
                    in the run up to the event</p>
            </div>


            <div className="relative w-[80%] h-[200px] flex items-center justify-center mx-auto">
                <img
                    src={Bg}
                    alt="ticket background"
                    className="absolute inset-0 w-full h-full object-contain"
                />
                <div className="relative z-10 right-5 flex flex-col items-start gap-5">
                    <div className="">
                       <img src={Logo} alt="Logo" className="w-[150px] mb-1 flex items-start" />
                    <p className="ml-6"> Jan 31, 2025 / Lagos, Nigeria</p> 
                    </div>

                    {/* Avatar and username details */}
                    
                    <div className="flex gap-5">
                        {avatar && <img src={avatar} alt={username} />}

                    <div className="flex flex-col items-start justify-center">
                    <p>{fullname} </p>
                    <div className="flex">
                        <img src={Icon} alt="" />
                    <p className="">{username}</p>
                    </div>

                    </div>

                    </div>
                    
                </div>
                <div className="relative left-10 rotate-90 text-lg">
                    <p className="text-[var(--neutral-300)]">#01609</p>
                </div>
            </div>

        </div>
    )

}

export default Ticket