import React, { Children } from "react";
import {
  Inner,
  Container,
  Image,
  Pane,
  SubTitle,
  Title,
  Item,
} from "./styles/jumbotron";

export const Jumbotron = (props) => {
  const { direction = "row" } = props;

  return (
    <Item>
      <Inner direction={direction} {...props} />
    </Item>
  );
};

Jumbotron.Container = (props) => {
  return <Container {...props} />;
};

Jumbotron.Title = (props) => {
  return <Title {...props} />;
};

Jumbotron.SubTitle = (props) => {
  return <SubTitle {...props} />;
};

Jumbotron.Image = (props) => {
  return <Image {...props} />;
};

Jumbotron.Pane = (props) => {
  return <Pane {...props} />;
};
