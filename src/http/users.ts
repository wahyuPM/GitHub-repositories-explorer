export const fetchUsers = async (searchTerm: string) => {
    const response = await fetch(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=5`
    );
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.items || [];
};

// src/http/users.ts
export const fetchUserRepos = async (username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data || [];
  };