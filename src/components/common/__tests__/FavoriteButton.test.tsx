// 1.コンポーネントのレンダリング：

// 2.FavoriteButton コンポーネントが正常にレンダリングされるかを確認します。
// 初期状態でボタンのラベルが "Add to Favorites" となっていることを確認します。
// お気に入りのトイレ追加：

// 3.ユーザーがログインしている状態で、お気に入りボタンをクリックすると、バックエンドにリクエストが送信され、トイレがお気に入りに追加されることを確認します。
// お気に入りに追加された後、ボタンのラベルが "Remove from Favorite" に変わることを確認します。
// エラーハンドリング：

// 4.リクエストが失敗した場合に、適切なエラーメッセージが表示されることを確認します。
// -------------------------------------------------------------------------------



// // src/components/common/__tests__/FavoriteButton.test.tsx
// import React from "react";
// import { render, waitFor } from "@testing-library/react";
// import '@testing-library/jest-dom';
// import axios from "axios";
// import userEvent from "@testing-library/user-event";
// import { UserProvider } from "../../../context/UserContext";
// import FavoriteButton from "../FavoriteButton";
// import { vi } from "vitest";

// vi.mock("axios");

// const mockAxios = axios as jest.Mocked<typeof axios>;

// describe("FavoriteButton", () => {
//     let toiletId: string;
//     let user: { _id: string, username: string, email: string };

//     beforeAll(() => {
//         toiletId = "123";
//         user = { _id: '456', username: 'testuser', email: 'testuser@example.com' };
//         window.alert = vi.fn();
//     });

//     beforeEach(() => {
//         vi.clearAllMocks();
//     });

//     test('should render with "Add to Favorites" as initial label', async () => {
//         mockAxios.get.mockResolvedValue({ data: [] });

//         const { getByText } = render(
//             <UserProvider value={{ user, setUser: vi.fn() }}>
//                 <FavoriteButton toiletId={toiletId} />
//             </UserProvider>
//         );
//         const button = getByText("Add to Favorites");
//         expect(button).toBeInTheDocument();
//     });

//     test('should set initial state based on favorites', async () => {
//         // トイレが既にお気に入りリストに含まれていると設定
//         mockAxios.get.mockResolvedValue({ data: [{ _id: toiletId }] });
    
//         const { getByText } = render(
//             <UserProvider value={{ user, setUser: vi.fn() }}>
//                 <FavoriteButton toiletId={toiletId} />
//             </UserProvider>
//         );
        
//         // 初期状態が "Remove from Favorite" として設定されていることを確認
//         await waitFor(() => expect(getByText("Remove from Favorite")).toBeInTheDocument());
//     });
    

//     test('should add a toilet to favorites when clicked', async () => {
//         console.log('---Start should add a toilet to favorites when clicked-----')
//         mockAxios.post.mockResolvedValue({ data: { message: 'Toilet added to favorites' } });
//         mockAxios.get.mockResolvedValue({ data: [] });

//         const { getByText } = render(
//             <UserProvider value={{ user, setUser: vi.fn() }}>
//                 <FavoriteButton toiletId={toiletId} />
//             </UserProvider>
//         );
//         const button = getByText("Add to Favorites");
//         await userEvent.click(button);

//         await waitFor(() => expect(mockAxios.post)
//             .toHaveBeenCalledWith('/api/favorites/add', { userId: user._id, toiletId }));

//         expect(button.textContent).toBe("Remove from Favorite");
//         console.log('---Finish should add a toilet to favorites when clicked-----');
//     });

//     test('should remove a toilet from favorites when clicked', async () => {
//         console.log('---Start should remove a toilet from favorites when clicked---');
        
//         const { getByText } = render(
//             <UserProvider value={{ user, setUser: vi.fn() }}>
//                 <FavoriteButton toiletId={toiletId} />
//             </UserProvider>
//         );

//         // First click to add to favorites
//         const button = getByText("Add to Favorites");
//         await userEvent.click(button);
//         await waitFor(()=>expect(mockAxios.post)
//         .toHaveBeenCalledWith('/api/favorites/add', { userId: user._id, toiletId }));
//         expect(button.textContent).toBe("Remove from Favorite");

//         // Second click to remove from favorites
//         await userEvent.click(button);
//         await waitFor(()=>expect(mockAxios.post)
//         .toHaveBeenCalledWith('/api/favorites/remove', { userId: user._id, toiletId }));
//         expect(button.textContent).toBe("Add to Favorites");
//         console.log('---Finish should remove a toilet from favorites when clicked-----')
//     });
// });
