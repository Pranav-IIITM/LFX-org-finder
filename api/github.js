export const config = { runtime: 'edge' };

export default async function handler(req) {
    // Handling CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    }

    const { searchParams } = new URL(req.url);
    const repo = searchParams.get('repo');

    if (!repo) {
        return new Response(JSON.stringify({ error: 'Missing repo parameter' }), { status: 400 });
    }

    const token = process.env.GITHUB_TOKEN;
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'lfx-org-finder'
    };

    if (token) {
        headers['Authorization'] = `token ${token}`;
    }

    try {
        const repoRes = await fetch(`https://api.github.com/repos/${repo}`, { headers });
        if (!repoRes.ok) {
            return new Response(JSON.stringify({ error: 'Repo not found' }), { status: 404 });
        }
        
        const repoData = await repoRes.json();

        const result = {
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            issues: repoData.open_issues_count
        };

        // Edge function caching: cache response for 1 hour at edge, 5 mins in browser
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: 'Fetch failed' }), { status: 500 });
    }
}
