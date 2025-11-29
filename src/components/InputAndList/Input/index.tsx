import { useState } from "react";
import { S_InputContainer } from "./styles";

export default function Input() {
  const [input, setInput] = useState("");

  return (
    <S_InputContainer 
      value={input} 
      onChange={(e) => setInput(e.target.value)} 
    />
  );
}
