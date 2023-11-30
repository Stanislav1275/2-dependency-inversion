export type StorageType = {
    set: (key: string, val: unknown) => void
    get: <T>(key: string, defVal: T) => T
}
