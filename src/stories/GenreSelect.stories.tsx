import type { Meta, StoryObj } from "@storybook/react";
import GenreSelect from "../components/GenreSelect/GenreSelect";

const meta: Meta<typeof GenreSelect> = {
  title: "Components/GenreSelect", 
  component: GenreSelect, 
  parameters: { layout: "centered", },
  tags: ["autodocs"], 
};

export default meta;
type Story = StoryObj<typeof GenreSelect>;

export const Primary: Story = {
  args: {
    genres: ["Rock", "Pop", "Jazz", "Classical", "Hip-Hop", "Country", "Blues"], 
    selectedGenre: "", 
    layout: "flex", 
    variant: "primary", 
    onSelect(genre) {
        console.log(`Selected genre: ${genre}`);
    },
  },
};

export const GridPrimary: Story = {
  args: {
    genres: ["Rock", "Pop", "Jazz", "Classical", "Hip-Hop", "Country", "Blues"], 
    selectedGenre: "Rock", 
    layout: "grid", 
    variant: "primary", 
  },
};

export const FlexSecondary: Story = {
  args: {
    genres: ["Hip-Hop", "Country", "Blues", "Rock", "Pop", "Jazz", "Classical"], 
    selectedGenre: "", 
    layout: "flex", 
    variant: "secondary", 
  },
};

export const GridSecondary: Story = {
  args: {
    genres: ["Hip-Hop", "Country", "Blues", "Rock", "Pop", "Jazz", "Classical"], 
    selectedGenre: "Rock", 
    layout: "grid", 
    variant: "secondary", 
  },
};