import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { summarizeReadme } from './chain';

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get('x-api-key');
    const { githubUrl } = await request.json();

    // Validate API key
    if (!apiKey) {
      return NextResponse.json({ error: 'API key required' }, { status: 400 });
    }

    // Validate GitHub URL
    if (!githubUrl) {
      return NextResponse.json({ error: 'GitHub URL required' }, { status: 400 });
    }

    // Validate GitHub URL format
    const githubUrlPattern = /^https:\/\/github\.com\/[\w-]+\/[\w-]+(\/.*)?$/;
    if (!githubUrlPattern.test(githubUrl)) {
      return NextResponse.json({ error: 'Invalid GitHub URL format' }, { status: 400 });
    }

    // Check API key validity
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    const readmeContent = await getGitHubReadme(githubUrl);
    if (!readmeContent) {
      return NextResponse.json({ error: 'Failed to fetch README content' }, { status: 500 });
    }

    const summary = await summarizeReadme(readmeContent);
    return NextResponse.json({ 
      success: true,
      summary
    });

  } catch (error) {
    console.error('GitHub summarizer error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 

async function getGitHubReadme(githubUrl: string): Promise<string | null> {
  try {
    // Extract owner and repo from GitHub URL
    const urlParts = githubUrl.replace('https://github.com/', '').split('/');
    const owner = urlParts[0];
    const repo = urlParts[1];

    // Fetch README content from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.raw',
          'User-Agent': 'Dandi-App',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        }
      }
    );

    if (!response.ok) {
      console.error('GitHub API error:', response.statusText);
      return null;
    }

    const readmeContent = await response.text();
    return readmeContent;

  } catch (error) {
    console.error('Error fetching README:', error);
    return null;
  }
}


