export function generateUUIDv7(): string {
    const timestamp = BigInt(Date.now());
    const random = crypto.getRandomValues(new Uint8Array(10));
    
    const timestampHex = timestamp.toString(16).padStart(12, '0');
    const randomHex = Array.from(random).map(b => b.toString(16).padStart(2, '0')).join('');
    
    return `${timestampHex.slice(0, 8)}-${timestampHex.slice(8, 12)}-7${randomHex.slice(0, 3)}-${randomHex.slice(3, 7)}-${randomHex.slice(7, 19)}`;
}