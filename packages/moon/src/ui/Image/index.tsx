import React, { useState } from "react";
import NextImage, { ImageProps } from "next/image";
import { useTheme } from "@material-ui/core";

export enum Icons {
  logo = "logo.png",
  payments = "payments.svg",
}

export const Icon = (icon: Icons, theme: "dark" | "light") =>
  `/icons/${theme === "dark" ? icon.replace(".", ".dark.") : icon}`;

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
}

export function Image(
  props: Omit<JSX.IntrinsicAttributes & ImageProps & { icon: Icons }, "src">
) {
  const theme = useTheme();
  const [isErrored, setIsErrored] = useState(false);
  return isErrored ? (
    // @ts-ignore
    <NextImage objectFit="contain" {...props} src={"/images/fallback.png"} />
  ) : (
    // @ts-ignore
    <NextImage
      objectFit="contain"
      onError={(e) => {
        setIsErrored(true);
      }}
      src={Icon(props.icon, theme.palette.type)}
      {...props}
    />
  );
}
