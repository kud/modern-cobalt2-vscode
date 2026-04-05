// @ts-nocheck
// Single-line comment
/* Block comment */

/**
 * JSDoc comment — describes the module
 * @param name - the user's name
 */

import { readFile, writeFile } from "fs/promises"
import type { EventEmitter } from "events"

// ─── Constants & Primitives ───────────────────────────────────────────────────

const MAX_RETRIES = 3
const PI = 3.14159
const isEnabled = true
const nothing = null
const empty = undefined
const template = `Hello, ${name}! You have ${MAX_RETRIES} retries.`
const regex = /^[a-z]+\d{2,4}$/gi

// ─── Enum ─────────────────────────────────────────────────────────────────────

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// ─── Interface & Type ─────────────────────────────────────────────────────────

interface User {
  id: number
  name: string
  email: string
  role: "admin" | "viewer"
  createdAt: Date
}

type ApiResponse<T> = {
  data: T
  status: number
  error?: string
}

// ─── Class ───────────────────────────────────────────────────────────────────

abstract class BaseService {
  protected readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  abstract fetch<T>(path: string): Promise<ApiResponse<T>>
}

class UserService extends BaseService {
  #cache = new Map<number, User>()

  constructor() {
    super("https://api.example.com")
  }

  async fetch<T>(path: string): Promise<ApiResponse<T>> {
    const res = await globalThis.fetch(`${this.baseUrl}${path}`)
    const data = (await res.json()) as T
    return { data, status: res.status }
  }

  async getUser(id: number): Promise<User | null> {
    if (this.#cache.has(id)) return this.#cache.get(id)!

    const { data, status } = await this.fetch<User>(`/users/${id}`)

    if (status !== 200) return null

    this.#cache.set(id, data)
    return data
  }
}

// ─── Functions ────────────────────────────────────────────────────────────────

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max)

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

async function retry<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES,
): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    if (retries <= 0) throw err
    await sleep(500)
    return retry(fn, retries - 1)
  }
}

// ─── Generics & Conditional Types ────────────────────────────────────────────

type NonNullable<T> = T extends null | undefined ? never : T
type Awaited<T> = T extends Promise<infer U> ? U : T

const identity = <T>(x: T): T => x

// ─── Destructuring & Spread ──────────────────────────────────────────────────

const { id, name, ...rest } = {
  id: 1,
  name: "Alice",
  email: "a@b.com",
  role: "admin" as const,
  createdAt: new Date(),
}
const merged = { ...rest, id, name }
const [first, second, ...remaining] = [1, 2, 3, 4, 5]

// ─── Error Handling ──────────────────────────────────────────────────────────

try {
  const content = await readFile("./config.json", "utf8")
  const config = JSON.parse(content)
  console.log("Loaded config:", config)
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error("Invalid JSON:", error.message)
  } else {
    throw error
  }
} finally {
  console.log("Done")
}

export { UserService, retry, clamp, Direction }
export type { User, ApiResponse }
