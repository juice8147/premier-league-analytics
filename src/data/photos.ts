/**
 * Optional image URLs. Key = player id (`team-slug`, e.g. `arsenal-bukayo-saka`) or team id.
 * Use images you have the rights to. Anything missing falls back to initials or the club crest.
 * Local files go in `public/` and are referenced as `/players/arsenal-bukayo-saka.jpg`.
 */
export const playerPhotos: Record<string, string> = {}

/** Club photo, normally the stadium. */
export const teamPhotos: Record<string, string> = {}
