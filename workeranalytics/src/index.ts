/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { Outerbase, CloudflareD1Connection } from '@outerbase/sdk';

async function getGroqChatCompletion(env) {
	const Groq = require('groq-sdk');
	const groq = new Groq({
		apiKey: env.GROK_KEY,
	});

	const connection: CloudflareD1Connection = new CloudflareD1Connection(env.API_KEY, env.ACCOUNT_ID, env.DATABASE_ID);
	const db = Outerbase(connection);

	const { data } = await db.selectFrom([{ table: 'conversations', columns: ['conversation'] }]).query();
	const response = await groq.chat.completions.create({
		messages: [
			{
				role: 'user',
				content: `Please give me an analysis of this data. ${JSON.stringify(data)}`,
			},
		],
		model: 'llama3-8b-8192',
	});
	await db
		.insert({ analysis: JSON.stringify(response.choices[0]?.message?.content) })
		.into('analysis')
		.query();
	return response;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const chatCompletion = await getGroqChatCompletion(env);
		return new Response(chatCompletion.choices[0]?.message?.content || '');
	},
};
