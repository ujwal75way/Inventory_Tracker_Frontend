
export const environment = {
    apiBaseUrl: (import.meta as unknown as { env: Record<string, string> }).env?.['API_BASE_URL'] || 'http://localhost:5033/api',
    production: false
};
