import { getInitials } from '../utils'

describe('getInitials', () => {
  it('should return initials', () => {
    expect(getInitials('John Mol')).toBe('JM')
    expect(getInitials('John')).toBe('JO')
    expect(getInitials('John Doe')).toBe('JD')
    expect(getInitials('John  Doe')).toBe('JD')
    expect(getInitials('John Doe', 1)).toBe('J')
  })
})
