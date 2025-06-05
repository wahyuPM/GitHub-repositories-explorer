/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Input, Button } from './components/atoms';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, fetchUserRepos } from './http/users';

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
		queryFn: () => fetchUsers(searchTerm),
		enabled: false,
	});

	const {
		data: repos,
		isLoading: isLoadingRepos,
		error: repoError,
		refetch: refetchRepos,
	} = useQuery({
		queryKey: repoQueryKey,
		queryFn: () => fetchUserRepos(selectedUser!),
		enabled: !!selectedUser,
	});

	const handleSearch = () => {
		if (!searchTerm) return;
		refetchUsers();
	};

	const handleUserClick = (username: string) => {
		setSelectedUser(username);
		refetchRepos();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	return (
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
				{userError && (
					<div className="text-red-500">{(userError as Error).message}</div>
				)}
				<div>
					{users?.map((user: any) => (
						<div key={user.id} onClick={() => handleUserClick(user.login)}>
							{user.login}
						</div>
					))}
				</div>
				{selectedUser && (
					<div>
						<h2>Repositories for {selectedUser}</h2>
						{isLoadingRepos ? (
							<div>Loading Repositories...</div>
						) : repoError ? (
							<div className="text-red-500">{(repoError as Error).message}</div>
						) : (
							<ul>
								{repos?.map((repo: any) => (
									<li key={repo.id}>{repo.name}</li>
								))}
							</ul>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
