import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.scss";

interface DisplayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  
  children: ReactNode;
  format?: "text" | "number" | "stretch";
  color?: string;
}

export function Button({children,format,color, ...props}: DisplayButtonProps){
  format = format || "number";
  return (
    <button 
      {...props}
      className={
        styles.button + " " + 
        styles[format] + " "
      } 
      style={{backgroundColor: color, color: color? "#222": ""}}
    >
      {children}
    </button>
  )
}