import React, { ReactNode, FC } from "react";

interface DisplayProps {
  children: ReactNode;
}

interface DisplayWhenProps {
  cond: boolean;
  children: ReactNode;
}

interface DisplayElseProps {
  render?: ReactNode;
  children?: ReactNode;
}

export const DynamicRenderer: FC<DisplayProps> & {
  When: FC<DisplayWhenProps>;
  Else: FC<DisplayElseProps>;
} = (props) => {
  let when: ReactNode | null = null;
  let otherwise: ReactNode | null = null;

  React.Children.forEach(props.children, (child) => {
    if (React.isValidElement(child)) {
      if ((child as any).props.cond === undefined) {
        otherwise = child;
      } else if (!when && (child as any).props.cond === true) {
        when = child;
      }
    }
  });

  return when || otherwise;
};

DynamicRenderer.When = ({ cond, children }) =>
  cond ? <>{children}</> : null;
DynamicRenderer.Else = ({ render, children }) =>
  render || children ? <>{render || children}</> : null;

/* usage: */
<DynamicRenderer>
  <DynamicRenderer.When cond={true}>child</DynamicRenderer.When>
  <DynamicRenderer.Else>child</DynamicRenderer.Else>
</DynamicRenderer>
