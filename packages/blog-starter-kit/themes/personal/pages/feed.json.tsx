import request from 'graphql-request';
import { GetServerSideProps } from 'next';
import { RssFeedDocument, RssFeedQuery, RssFeedQueryVariables } from '../generated/graphql';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const JSONFeed = () => null;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { res, query } = ctx;
	const after = query.after ? (query.after as string) : null;

	const data = await request<RssFeedQuery, RssFeedQueryVariables>(GQL_ENDPOINT, RssFeedDocument, {
		first: 20,
		host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
		after,
	});

	const publication = data.publication;
	if (!publication) {
		return {
			notFound: true,
		};
	}
	const allPosts = publication.posts.edges.map((edge) => edge.node);

	// Construct JSON Feed
	const jsonFeed = {
		version: 'https://jsonfeed.org/version/1.1',
		title: publication.title || `${publication.author.name}'s Blog`,
		description: publication.descriptionSEO || `${publication.author.name}'s thoughts and insights`,
		home_page_url: publication.url,
		feed_url: `${publication.url}/feed.json${after ? `?after=${after}` : ''}`,
		language: 'en',
		...(publication.preferences?.logo && { icon: publication.preferences.logo }),
		...(publication.preferences?.logo && { favicon: publication.preferences.logo }),
		authors: [
			{
				name: publication.author.name,
				url: `https://hashnode.com/@${publication.author.username}`,
			},
		],
		items: allPosts.map((post) => ({
			id: post.url,
			url: post.url,
			title: post.title,
			content_html: post.content?.html || '',
			summary: post.title, // Using title as summary since other fields aren't available
			date_published: new Date().toISOString(), // Fallback date
			authors: [
				{
					name: post.author.name,
					url: `https://hashnode.com/@${post.author.username}`,
				},
			],
			tags: post.tags?.map((tag) => tag.name) || [],
			external_url: post.url,
			_hashnode: {
				publication_id: publication.id,
				post_id: post.id,
			},
		})),
		...(publication.posts.pageInfo.hasNextPage && 
			publication.posts.pageInfo.endCursor && {
			next_url: `${publication.url}/feed.json?after=${publication.posts.pageInfo.endCursor}`,
		}),
	};

	res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
	res.setHeader('content-type', 'application/feed+json');
	res.write(JSON.stringify(jsonFeed, null, 2));
	res.end();

	return { props: {} };
};

export default JSONFeed;