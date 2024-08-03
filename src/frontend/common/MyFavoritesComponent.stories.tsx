// src/components/common/MyFavoritesComponent.stories.tsx
import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { UserProvider, UserContextProps } from "../context/UserContext";
import MyFavoritesComponent from "./MyFavoritesComponent";

export default {
    title: 'Common/MyFavoritesComponent',
    component: MyFavoritesComponent,
    decorators: [(Story) => (
        <UserProvider value={{
            user: { _id: "1", username: 'JohnDoe', email: 'john.doe@example.com' },
            setUser: () => { }
        }}>
            <Story />
        </UserProvider>
    )],
} as Meta<typeof MyFavoritesComponent>;

// 偽のトイレデータ
const fakeToilets = [
    {
        _id: '1',
        name: 'Toilet A',
        address: '123 Main St',
        averageRating: 4.5,
        comment: 'Very clean and well-maintained.',
        universal: true,
    },
    {
        _id: '2',
        name: 'Toilet B',
        address: '456 Elm St',
        averageRating: 3.8,
        comment: 'Convenient but could be cleaner.',
        universal: false,
    },
    {
        _id: '3',
        name: 'Toilet C',
        address: '789 Oak St',
        averageRating: 4.2,
        comment: 'Spacious and accessible.',
        universal: true,
    },
];

const Template: StoryFn<typeof MyFavoritesComponent> = (args) => (
    <MyFavoritesComponent {...args} />
);

export const Default: StoryObj<typeof MyFavoritesComponent> = Template.bind({});
Default.args = {
    // デフォルトのプロップスがあればここに追加
};

export const WithFakeToilets: StoryObj<typeof MyFavoritesComponent> = Template.bind({});
WithFakeToilets.args = {
    favorites: fakeToilets,
};
