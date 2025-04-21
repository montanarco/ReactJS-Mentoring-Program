import type { Meta, StoryObj } from '@storybook/react';
import Counter from '../components/Counter/Counter';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    layout: 'centered', 
  },
  tags: ['autodocs'], 
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: 0,
  },
};

// Counter instance with an initial value of 10
export const InitialValueTen: Story = {
  args: {
    initialValue: 10,
  },
};

// Counter instance with a negative initial value
export const InitialNegativeValue: Story = {
  args: {
    initialValue: -5,
  },
};