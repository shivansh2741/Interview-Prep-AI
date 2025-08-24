import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext);


    return <div>
        <Navbar />
        {user && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16 py-8 justify-items-center">
            {children}
        </div>

        }
    </div>
}

export default DashboardLayout;