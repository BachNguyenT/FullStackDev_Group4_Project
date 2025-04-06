import { Link } from "react-router-dom";

function Button({ to, href, children, onClick, className, ...passProps }) {
  let Comp = 'button';

  const props = {
    onClick,
    className,
    ...passProps
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  return (
    <Comp {...props}>
      <span>{children}</span>
    </Comp>
  );
}

export default Button;