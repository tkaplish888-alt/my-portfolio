// Strip **bold** markers for plain-text contexts.
export const plain = text => String(text || "").replace(/\*\*/g, "");
