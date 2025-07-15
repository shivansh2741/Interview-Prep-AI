import { Navigate } from "react-router-dom";
import { APP_FEATURES } from "../../utils/data";


const LandingPage = () => {
    return (
        <div className="py-6 px-10 md:px-20 w-full bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 min-h-screen">
            <nav className="relative top-0 flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between mb-20 items-center">
                <h1 className="text-xl font-bold text-black">Interview Prep AI</h1>
                <button className="bg-orange-400 px-4 py-2 rounded-3xl text-white cursor-pointer">Login / Signup</button>
            </nav>
            <div className="flex flex-col xl:flex-row justify-between items-center">
                <div className="mb-10 xl: mb-0">
                    <div className="bg-orange-200 px-4 py-2 w-fit rounded-3xl text-orange-700 font-bold mb-10">AI Powered</div>
                    <div className="text-[50px] font-bold leading-tight">Ace Interview with <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                        AI powered <> </>
                    </span>

                        Learning</div>
                </div>
                <div className="flex flex-col gap-10 items-center xl:self-end">
                    <div className="max-w-[500px] text-[17px] font-semibold">Get role specific questions, expand answers when you need them. Dive deeper into concepts and organize everything your way.
                        From preparation to mastery - ultimate toolkit is here.
                    </div>
                    <button className="bg-black text-white text-md font-bold px-4 py-2 rounded-3xl w-[200px] mb-4 cursor-pointer">Get Started</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;