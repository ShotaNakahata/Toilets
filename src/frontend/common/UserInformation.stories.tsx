import React from "react";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { UserProvider, UserContextProps } from "../context/UserContext";
import {UserInformation} from "./UserInformation";

export default {
    title: 'Common/UserInformation',
    component: UserInformation,
    decorators: [(Story) => (
        <UserProvider>
            <Story />
        </UserProvider>
    )],
} as Meta<typeof UserInformation>;

const Template: StoryFn<typeof UserInformation> = (args:any) => <UserInformation {...args} />;

export const Default: StoryObj<typeof UserInformation> = Template.bind({});
Default.args = {
    // デフォルトのプロップスがあればここに追加
};

const WithUserDecorator = (Story: any) => {
    const userContextValue: UserContextProps = {
        user: { _id: '1', username: 'JohnDoe', email: 'john.doe@example.com' },
        setUser: () => {},
    };

    return (
        <UserProvider value={userContextValue}>
            <Story />
        </UserProvider>
    );
};

export const WithUser: StoryObj<typeof UserInformation> = Template.bind({});
WithUser.decorators = [WithUserDecorator];
