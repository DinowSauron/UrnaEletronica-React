import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.scss";

interface DisplayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  
  children: ReactNode;
  format?: "text" | "number" | "stretch";
  color?: string;
}

export function Button({children,format = "number",color, ...props}: DisplayButtonProps){
  
  return (
    <button 
      {...props}
      className={[
        styles.button,
        styles[format]
      ].join(" ")}
      style={{backgroundColor: color, color: color? "#222": ""}}
    >
      {children}
    </button>
  )
}
