/**
 * Represents an object reference that can be compared to other objects.
 */
export interface Comparable {
  equals(other: any): boolean
}
