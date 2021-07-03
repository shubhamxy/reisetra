import React from 'react';
import { Story, Meta } from '@storybook/react';

import { AppHeader } from '../ui/Header';

export default {
  title: 'ui/AppHeader',
  component: AppHeader,
} as Meta;

const Template: Story<any> = (args) => <AppHeader {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
