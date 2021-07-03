import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from '@material-ui/core';

export default {
  title: 'ui/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Contained = Template.bind({});
Contained.args = {
  color: "primary",
  variant: "contained",
  children: 'Button',
};

export const Outline = Template.bind({});
Outline.args = {
  color: "primary",
  variant: "outline",
  children: 'Button',
};

export const Text = Template.bind({});
Text.args = {
  color: "primary",
  variant: "text",
  children: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  variant: "contained",
  children: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  variant: "contained",
  children: 'Button',
};
