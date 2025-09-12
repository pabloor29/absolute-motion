"use client";

import React, { useState } from "react";

type FormuleCardProps = {
  name: string;
  price: string;
  description: string;
  items: string[];
};

export default function FormuleCard({ name, price, description, items }: FormuleCardProps) {

  return (
    <div className="w-3/4 md:w-1/4 bg-darkColor rounded-xl flex flex-col justify-center items-center">

        <h1 className="font-calSans text-clearColor text-2xl text-center mt-2 mb-4">{name}</h1>
        <p className="text-center font-rajdhaniRegular text-clearColor text-2xl">{price}</p>
        <p className="px-6 text-center font-rajdhaniRegular text-clearColor text-xl">{description}</p>

        <div className="my-4 p-3 w-[90%] h-full bg-mainColor/30 rounded-xl">
            <ul className="list-disc list-inside font-rajdhaniRegular text-clearColor text-xl">
                {items.map((item, index) => (
                <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    </div>
  );
}
