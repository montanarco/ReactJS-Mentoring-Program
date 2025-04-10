import type { Meta, StoryObj } from "@storybook/react";
import SearchForm from "../components//SearchForm/SearchForm";

const meta: Meta<typeof SearchForm> = {
  title: "Components/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
  argTypes: {
    searchFunction: { action: "search triggered" }, // Logs search query in the Actions tab
  },
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

// Default story with primary variant
export const Primary: Story = {
  args: {
    placeholder: "Type a keyword...",
    variant: "primary",
  },
};

// Story with secondary variant
export const Secondary: Story = {
  args: {
    placeholder: "Type a keyword...",
    variant: "secondary",
  },
};