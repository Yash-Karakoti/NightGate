export function reportError(error: unknown, context: Record<string, unknown> = {}): void {
  // Simple console logger for runtime errors
  console.error('Error reported:', error, context);
}
