
import { fetchGitHubData } from '../global.js'; // Import function


const githubData = await fetchGitHubData('AndresRiera'); // Fetch data
const profileStats = document.querySelector('#profile-stats'); // Select HTML container

if (profileStats) {
    profileStats.innerHTML = `
            <dl>
                <dt>FOLLOWERS:</dt><dd>${githubData.followers}</dd>
                <dt>FOLLOWING:</dt><dd>${githubData.following}</dd>
                <dt>PUBLIC REPOS:</dt><dd>${githubData.public_repos}</dd>
                <dt>PUBLIC GISTS:</dt><dd>${githubData.public_gists}</dd>
            </dl>
        `;
    }