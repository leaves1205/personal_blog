// 把密码转成哈希值存入数据库（PBKDF2 算法）
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 10000, hash: 'SHA-256' },
    keyMaterial,
    256
  );

  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${saltHex}:${hashHex}`;
}

// 验证密码是否正确
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':');
  const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map(h => parseInt(h, 16)));
  const encoder = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 10000, hash: 'SHA-256' },
    keyMaterial,
    256
  );

  const newHashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  return newHashHex === hashHex;
}

// 创建 session token（HMAC-SHA256 签名）
export async function createSessionToken(
  userId: number,
  username: string,
  secret: string
): Promise<string> {
  const payload = btoa(JSON.stringify({ userId, username, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const sigHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${payload}.${sigHex}`;
}

// 验证 session token，返回 payload 或 null
export async function verifySessionToken(
  token: string,
  secret: string
): Promise<{ userId: number; username: string } | null> {
  try {
    const [payload, sigHex] = token.split('.');
    if (!payload || !sigHex) return null;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = new Uint8Array(sigHex.match(/.{2}/g)!.map(h => parseInt(h, 16)));
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(payload));
    if (!valid) return null;

    const data = JSON.parse(atob(payload));
    if (Date.now() > data.exp) return null;

    return { userId: data.userId, username: data.username };
  } catch {
    return null;
  }
}
