import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500"
];

const Body = () => {
  const [color, setColor] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [])

  return (
    <div className="flex flex-grow text-gray-300">
      
      <header
        className="absolute top-5 right-8 bg-black text-gray-200 cursor-pointer rounded-full
        flex items-center space-x-3 p-1 pr-2 hover:opacity-90"
      >
        <img className="rounded-full w-10" src={session?.user.image} alt="Profile picture" />
        <p> {session?.user.name} </p>
        <ChevronDownIcon className="w-5" />
      </header>

      <div
        className={`flex w-full items-end space-x-7 bg-gradient-to-b to-black ${color} h-80
        text-white padding-8`}
      >
        <p> Profile </p>
      </div>

    </div>
  );
}

export default Body;
