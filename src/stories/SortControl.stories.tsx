import type { Meta, StoryObj } from "@storybook/react";
import SortControl from "../components/SortControl/SortControl";

const meta: Meta<typeof SortControl> = {
  title: "Example/SortControl", 
  component: SortControl, 
  parameters: { layout: "centered" }, 
  tags: ["autodocs"], 
};

export default meta;
type Story = StoryObj<typeof SortControl>;

export const PrimaryVariant: Story = {
  args: {
    selectedValue: "Release Date", 
    onChange: (selected: string) => {
      console.log(`Primary SortControl selected: ${selected}`);
    }, 
    variant: "primary", 
  },
};

export const SecondaryVariant: Story = {
  args: {
    selectedValue: "Title", 
    onChange: (selected: string) => {
      console.log(`Secondary SortControl selected: ${selected}`);
    }, 
    variant: "secondary", 
  },
};