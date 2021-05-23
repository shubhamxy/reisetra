import React, { useState } from "react";
import NextImage, { ImageProps } from "next/image";

export enum Icons {
  logo = "/icons/logo.svg",
  payments = "/icons/payments.svg"
};


export enum Images {
  category1 = "/images/1.jpeg",
  category2 = "/images/2.jpeg",
  category3 = "/images/3.jpeg",
  category4 = "/images/4.jpeg",
  category5 = "/images/5.jpeg",
  category6 = "/images/6.jpeg",
  category7 = "/images/7.jpeg",
  category8 = "/images/8.jpeg",
  category9 = "/images/9.jpeg",
  category10 = "/images/10.jpeg",
  category11 = "/images/11.jpeg",
  category12 = "/images/12.jpeg",
};

export function Image(props: JSX.IntrinsicAttributes & ImageProps) {
  const [isErrored, setIsErrored] = useState(false);
  return isErrored ? (
    <NextImage objectFit="contain" {...props} src={"/images/fallback.png"} />
  ) : (
    <NextImage
      objectFit="contain"
      onError={(e) => {
        setIsErrored(true);
      }}
      {...props}
    />
  );
}
