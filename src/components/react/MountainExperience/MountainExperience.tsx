import React, { useState } from "react";
import { FlagIcon } from "../icons/FlagIcon";
import styles from "./style.module.css";
import { cn } from "@/utils/cn";
import { Popover } from "./Popover";

interface ExperienceItemProps {
  id: string;
  title: string;
  company: string;
  description: string;
  logo: string;
  period: string;
  x: string;
  y: string;
}

interface Props {
  experiences: ExperienceItemProps[];
}

export function MountainExperience({ experiences }: Props) {
  const [selectedCompanie, setSelectedCompanie] = useState<string | null>(null);
  return (
    <div className="w-full flex lg:flex-col flex-col-reverse">
      <h1 className="text-center dark:text-title font-bold text-xl">
        {selectedCompanie ?? (
          <span>
            <span className="text-yellow-500 font-bold">
              Cada paso deja huella.
            </span>{" "}
            Imagina una montaña, con cada cima alcanzada marcando un{" "}
            <span className="text-yellow-500 font-bold">hito</span> en el
            camino.
          </span>
        )}
      </h1>
      <div className="w-full relative">
        <div className={styles.mountain}></div>
        {experiences.map((experience) => (
          <button
            key={experience.id}
            onClick={() => setSelectedCompanie(experience.company)}
            style={{ top: experience.y, left: experience.x }}
            className={`text-black absolute top-0 left-0 cursor-pointer bg-transparent border-none p-0`}
            aria-label={`Ver detalles de ${experience.title} en ${experience.company}`}
          >
            <Popover
              content={
                <div className="flex flex-col gap-4">
                  <h3 className="text-center text-title font-bold text-2xl">
                    {experience.title}
                  </h3>
                  <p className="text-paragraph dark:text-gray-400 text-xl">
                    {experience.description}
                  </p>
                  <p className="text-yellow-500 dark:text-yellow-400 text-base">
                    {experience.period}
                  </p>
                </div>
              }
            >
              <FlagIcon
                className={cn(
                  "size-8 md:size-12 p-1 md:p-2 text-yellow-50 animate-pulse ring-2 md:ring-4 ring-gray-500/80 rounded-full ring-offset-1 md:ring-offset-2 ring-offset-[#292929]-400 bg-darksurface",
                  selectedCompanie === experience.company
                    ? "text-yellow-500 animate-none ring-yellow-500/80"
                    : ""
                )}
              />
            </Popover>
          </button>
        ))}
      </div>
      <div className={styles.experienceListContainer}>
        <h1 className="text-title text-2xl mb-4">Lista de experiencias</h1>
        <div className={cn(["flex flex-col gap-3 text-paragraph"])}>
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex lg:flex-row flex-col items-center gap-2"
            >
              <FlagIcon
                className={cn(
                  "size-8 md:size-12 text-yellow-50",
                  selectedCompanie === experience.company
                    ? "text-yellow-500 animate-none ring-yellow-500/80"
                    : ""
                )}
              />
              <span className={styles.experienceListItem} key={experience.id}>
                {experience.id} - {experience.title}
              </span>
              <p className="lg:hidden text-paragraph">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
