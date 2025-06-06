/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Input, Button } from './components/atoms';
import { Accordion } from './components/organisms';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, fetchUserRepos } from './http/users';
import { ToastContainer } from 'react-toastify';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedUser, setSelectedUser] = useState<string | null>(null);

	const userQueryKey = ['searchUsers', { searchTerm }];
	const repoQueryKey = ['fetchRepos', { selectedUser }];

	const {
		data: users,
		isLoading: isLoadingUsers,
		error: userError,
		refetch: refetchUsers,
	} = useQuery({
		queryKey: userQueryKey,
		queryFn: ({ signal }) => fetchUsers(signal, searchTerm),
		enabled: false,
	});

	const { data: repos, isLoading: isLoadingRepos } = useQuery({
		queryKey: repoQueryKey,
		queryFn: ({ signal }) => fetchUserRepos(signal, selectedUser!),
		enabled: !!selectedUser,
	});

	const handleSearch = () => {
		if (!searchTerm) return;
		refetchUsers();
	};

	const handleUserClick = (username: string) => {
		setSelectedUser(prevUser => (prevUser === username ? null : username));
		// if (selectedUser !== username) {
		// 	refetchRepos();
		// }
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<>
			<div className="container mx-auto p-4">
				<div className="flex flex-col gap-4">
					<Input
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						placeholder="Search GitHub users"
						onKeyDown={handleKeyDown}
					/>
					<Button
						onClick={handleSearch}
						disabled={isLoadingUsers}
						className="rounded-md"
						loading={isLoadingUsers}
					>
						Search
					</Button>
					{users?.length > 0 && <p>Showing users for "{searchTerm}"</p>}
					{userError && (
						<div className="text-red-500">{(userError as Error).message}</div>
					)}
					{isLoadingUsers
						? Array.from({ length: 5 }).map((_, i) => (
								<div
									key={i}
									className="animate-pulse bg-gray-300 h-[56px] rounded"
								></div>
						  ))
						: users?.map((user: any) => (
								<Accordion
									key={user.id}
									user={user}
									repos={selectedUser === user.login ? repos || [] : []}
									onToggle={handleUserClick}
									isOpen={selectedUser === user.login}
									loading={isLoadingRepos && selectedUser === user.login}
								/>
						  ))}
				</div>
			</div>
			<ToastContainer />
		</>
	);
}

export default App;
