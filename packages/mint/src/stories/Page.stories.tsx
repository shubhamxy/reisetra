import React from 'react';
import { Story, Meta } from '@storybook/react';

import Page from '../pages/index';

export default {
  title: 'Example/Page',
  component: Page,
} as Meta;

const Template: Story<any> = (args) => <Page {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {
};
