import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, useCallback } from 'react';
import { Redirect } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from '@layouts/Workspace/styles';

const Workspace: FC = ({ children }) => {
    const { data, error, revalidate } = useSWR('/api/users', fetcher);

    const onLogout = useCallback(() => {
        axios
            .post('/api/users/logout', null, {
                withCredentials: true,
            })
            .then(() => {
                revalidate();
            });
    }, []);

    if (!data) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
        <Header>
            <RightMenu>
                <span>
                    <ProfileImg src={gravatar.url(data.email, {s: '28px', d: 'retro'})} alt={data.nickname} />
                </span>
            </RightMenu>
        </Header>
            <button onClick={onLogout}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll></MenuScroll>
                </Channels>
                <Chats>chat</Chats>
            </WorkspaceWrapper>
        </div>
    );
};

export default Workspace;