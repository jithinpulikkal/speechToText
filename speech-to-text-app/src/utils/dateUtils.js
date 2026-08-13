export function formatDuration(total = 0) {
  const min = Math.floor(total / 60).toString().padStart(2, "0");
  const sec = Math.floor(total % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

export function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "";
}
