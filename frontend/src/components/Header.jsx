import { useState } from "react";
import { logo, hamburgerMenu, close,  pen} from "../assets";
import NewEntry from "./NewEntry";
import Logout from "./Logout";

const Header = () => {

  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);

  return (
    <div className="w-full h-[80px] bg-white border-b">
      <div className="md:max-w-[1200px] max-w-[500px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <img src={logo} className="h-[78px] w-[90px]" />

        <div className="hidden md:flex items-center font-serif italic">
        A journal is your completely unaltered voice...
        </div>

        <div className="hidden md:flex">
          <NewEntry/>
          <Logout/>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} />
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <ul>
          <div className="flex flex-col my-4 gap-4">
            <button
              className="border border-[#FFC000] flex justify-center items-center  bg-transparent 
                        rounded-md px-6 gap-2 py-4"
            >
              <img src={pen} className="w-6"/>
              New
            </button>
            <button className="px-8 py-5 rounded-md bg-[#FFC000] text-white font-bold">
              Logout{" "}
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Header;