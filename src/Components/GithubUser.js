import React, { useState } from 'react';

const GithubUser = () => {
const [username, setUsername] = useState('');
const [userData, setUserData] = useState(null);
const [iserror, setError] = useState(null);
const [repoData, setRepoData] = useState(null);

const fetchUserData = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
            const data = await response.json();
            setUserData(data);
            console.log(data);
            const fetchRepo = await fetch(data.repos_url);
            if (fetchRepo.ok) {
                const repo = await fetchRepo.json();
                setRepoData(repo);
                console.log(repo);
            }
        } else {
            setError('User not found');
            setUserData(null)
        }
    } catch (error) {
        setError('An error occurred while fetching data');
    }
};
return (
    <div className="flex flex-col items-center p-8">
        <div className="mb-4 w-full max-w-md">
            <input
                className="p-2 border border-gray-300 rounded w-full"
                type="text"
                placeholder="Enter GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button
                className="mt-2 py-2 px-4 bg-blue-500 text-white rounded w-1/2"
                onClick={fetchUserData}
            >
                Search
            </button>
        </div>
        {userData ? (
            <div className="w-full">
                <div className="max-w-md md:max-w-2xl bg-white border border-gray-300 rounded p-6 shadow-md mx-auto mb-4 text-center grid md:grid-cols-2 ">
                    <div>
                        <img
                            className="w-24 h-24 rounded-full mx-auto mb-4 border border-orange-500"
                            src={userData.avatar_url}
                            alt="Profile"
                        />
                        <h2 className="text-2xl font-semibold mb-2">{userData.login}</h2>
                    </div>
                    <div>
                        <p className="mb-2 text-xl">Name: {userData.name}</p>
                        <p className="mb-2 text-xl">
                            No Of Public Repos: {userData.public_repos}
                        </p>
                        <p className="mb-2 text-xl">
                            No Of Public Gists: {userData.public_gists}
                        </p>
                        <p>Profile Created At: {new Date(userData.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="text-4xl font-bold m-6">Repository List</div>
                <div className="grid md:grid-cols-2 gap-4 ">
                    {repoData ? (
                        repoData.map((repo) => (
                            <div className="border border-green-900 rounded p-4 text-left w-full " key={repo.id} >
                                <div className="md:flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-2"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        {repo.name}
                                    </div>
                                    <div className="flex items-center">
                                        <div
                                            className="h-2 w-2 rounded-full bg-orange-600 m-2"
                                            style={{ marginRight: '0.5rem' }}
                                        ></div>
                                        {repo.language}
                                    </div>
                                </div>
                                <div className="mt-2">{repo.description}</div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl text-red-700 font-bold ">Repository Not available</p>
                    )}
                </div>
            </div>
        ) : iserror ? (
            <p className="text-red-700 text-xl font-bold mt-4 text-center">{iserror}</p>
        ) : null}
    </div>
);
}

export default GithubUser