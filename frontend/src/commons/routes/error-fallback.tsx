import React, { useEffect } from "react";

export default function ErrorFallback({ error }: any) {
  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      if (!getWithExpiry("chunk_failed")) {
        setWithExpiry("chunk_failed", "true", 500000);
        window.location.reload();
      }
    }
  }
  , [error]);

  return (
    <div>
      <p>Something went wrong.</p>
      <pre>{error?.message}</pre>
    </div>
  );
}

export function setWithExpiry(key: string, value: string, ttl: number) {
  const item = {
    value: value,
    expiry: new Date().getTime() + ttl
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key: string) {
  const itemString = window.localStorage.getItem(key);
  if (!itemString) return null;

  const item = JSON.parse(itemString);
  const isExpired = new Date().getTime() > item.expiry;

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
