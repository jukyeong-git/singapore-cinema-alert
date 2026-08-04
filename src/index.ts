interface Env {}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		return new Response(
			JSON.stringify({
				service: "Singapore Cinema Alert",
				status: "running",
			}),
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	},

	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext,
	): Promise<void> {
		console.log("Checking Singapore cinema schedules...");
	},
} satisfies ExportedHandler<Env>;