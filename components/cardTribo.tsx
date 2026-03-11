import { tribos } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const CardTribo = ({
  profile,
  setSelected,
}: {
  profile: (typeof tribos)[number];
  setSelected: React.Dispatch<
    React.SetStateAction<(typeof tribos)[number] | null>
  >;
}) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => setSelected(profile)}
    >
      <div className="group hover:scale-105 transition-transform duration-300 w-40">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <Image
            src={profile.image}
            alt={profile.name}
            width={250}
            height={250}
            className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
          />
        </div>
      </div>
      <div className="p-4 text-center">
        <p className="text-white font-semibold text-lg">{profile.name}</p>
      </div>
    </div>
  );
};

export default CardTribo;
