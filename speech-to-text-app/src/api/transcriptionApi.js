import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "speechToText.transcriptions";

function now() {
  return new Date().toISOString();
}

async function readItems() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeItems(items) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function response(data, message = "OK") {
  return Promise.resolve({ success: true, message, data });
}

export async function getTranscriptions(params = {}) {
  const search = String(params.search || "").trim().toLowerCase();
  let transcriptions = await readItems();
  if (search) {
    transcriptions = transcriptions.filter(item =>
      item.title.toLowerCase().includes(search) ||
      item.transcriptionText.toLowerCase().includes(search)
    );
  }
  transcriptions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return response({ transcriptions }, "Transcriptions loaded.");
}

export async function getTranscription(id) {
  const transcription = (await readItems()).find(item => String(item.id) === String(id));
  return response({ transcription }, "Transcription loaded.");
}

export async function createTranscription(payload) {
  const createdAt = now();
  const item = {
    id: Date.now(),
    title: payload.title || `Recording - ${new Date().toLocaleString()}`,
    transcriptionText: payload.transcriptionText.trim(),
    languageCode: payload.languageCode || "en-IN",
    durationSeconds: Number(payload.durationSeconds) || 0,
    createdAt,
    updatedAt: createdAt
  };
  const items = [item, ...(await readItems())];
  await writeItems(items);
  return response({ transcription: item }, "Transcription saved successfully.");
}

export async function updateTranscription(id, payload) {
  const items = await readItems();
  const index = items.findIndex(item => String(item.id) === String(id));
  if (index >= 0) {
    items[index] = { ...items[index], ...payload, updatedAt: now() };
    await writeItems(items);
    return response({ transcription: items[index] }, "Transcription updated.");
  }
  return Promise.reject(new Error("Transcription not found."));
}

export function renameTranscription(id, title) {
  return updateTranscription(id, { title });
}

export async function deleteTranscription(id) {
  await writeItems((await readItems()).filter(item => String(item.id) !== String(id)));
  return response({}, "Transcription deleted.");
}
