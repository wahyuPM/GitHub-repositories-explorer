// src/http/users.ts
import { showErrorToast } from '../utils/toast';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchUsers = async (signal: AbortSignal, searchTerm: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchTerm}&per_page=5`,
      {
        signal,
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast(error.message);
    } else {
      showErrorToast('An unknown error occurred');
    }
    return [];
  }
};

export const fetchUserRepos = async (signal: AbortSignal, username: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        signal,
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    if (error instanceof Error) {
      showErrorToast(error.message);
    } else {
      showErrorToast('An unknown error occurred');
    }
    return [];
  }
};