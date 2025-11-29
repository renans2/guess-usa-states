import Input from "./Input";
import List from "./List";
import Map from "./Map";
import { S_Main } from "./styles";

export default function Main() {
  return (
    <S_Main>
      <Map />
      <Input />
      <List />
    </S_Main>
  );
}
