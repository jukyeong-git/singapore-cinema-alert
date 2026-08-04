interface Env {
	TELEGRAM_BOT_TOKEN: string;
	TELEGRAM_CHAT_ID: string;
}

async function sendTelegramMessage(
	env: Env,
	text: string,
): Promise<void> {
	const response = await fetch(
		`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				chat_id: env.TELEGRAM_CHAT_ID,
				text,
			}),
		},
	);

	if (!response.ok) {
		const errorBody = await response.text();

		throw new Error(
			`Telegram API request failed: ${response.status} ${errorBody}`,
		);
	}
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/telegram-test") {
			try {
				await sendTelegramMessage(
					env,
					"🎬 Singapore Cinema Alert 테스트 메시지입니다.",
				);

				return new Response("Telegram message sent successfully.");
			} catch (error) {
				console.error(error);

				return new Response(
					error instanceof Error
						? error.message
						: "Unknown error",
					{ status: 500 },
				);
			}
		}

		return Response.json({
			service: "Singapore Cinema Alert",
			status: "running",
			testUrl: "/telegram-test",
		});
	},

	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	): Promise<void> {
		console.log("Checking Singapore cinema schedules...");
	},
} satisfies ExportedHandler<Env>;