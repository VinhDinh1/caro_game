import { Button } from "antd";

function button({
  name,
  handleClick,
  typebutton,
}: {
  name: any;
  handleClick: any;
  typebutton: string;
}) {
  const clickButton = () => {
    handleClick();
  };

  return (
    <Button onClick={clickButton} type={(typebutton = "primary")}>
      {name}
    </Button>
  );
}

export default button;
