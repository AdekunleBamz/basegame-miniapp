// Lightweight browser shim for @react-native-async-storage/async-storage
// Methods are async to match the RN API surface.
const storage = typeof window !== 'undefined' && window.localStorage ? window.localStorage : null

const AsyncStorageShim = {
  async getItem(key) {
    if (!storage) return null
    try { return storage.getItem(key) }
    catch { return null }
  },
  async setItem(key, value) {
    if (!storage) return
    try { storage.setItem(key, value) } catch {}
  },
  async removeItem(key) {
    if (!storage) return
    try { storage.removeItem(key) } catch {}
  },
  async clear() {
    if (!storage) return
    try { storage.clear() } catch {}
  }
}

module.exports = AsyncStorageShim
