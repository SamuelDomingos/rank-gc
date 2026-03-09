"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const profiles = [
    {
      id: 1,
      name: "Hope",
      image: "/tribos/hope.jpeg",
      ministerio: "School",
    },
    {
      id: 2,
      name: "Sent",
      image: "/tribos/sent.jpeg",
      ministerio: "School",
    },
    {
      id: 3,
      name: "Hazak",
      image: "/tribos/hazak.jpeg",
      ministerio: "School",
    },
    {
      id: 4,
      name: "Blast",
      image: "/tribos/blast.jpg",
      ministerio: "JR",
    },
    {
      id: 5,
      name: "Shomer",
      image: "/tribos/shomer.jpg",
      ministerio: "JR",
    },
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-3xl font-bold mb-12">Qual tribo?</h1>

      <div className="text-center mb-12">
        <h2 className="font-semibold text-2xl mb-8"> School </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {profiles
            .filter((profile) => profile.ministerio === "School")
            .map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() =>
                  router.push(`/tribo/${profile.name.toLowerCase()}`)
                }
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
                  <p className="text-white font-semibold text-lg">
                    {profile.name}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="font-semibold text-2xl mb-8"> JR </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center justify-center">
          {profiles
            .filter((profile) => profile.ministerio === "JR")
            .map((profile) => (
              <div
                key={profile.id}
                className="flex flex-col items-center cursor-pointer"
                onClick={() =>
                  router.push(`/tribo/${profile.name.toLowerCase()}`)
                }
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
                  <p className="text-white font-semibold text-lg">
                    {profile.name}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
