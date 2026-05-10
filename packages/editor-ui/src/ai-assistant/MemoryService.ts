export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const MAX_HISTORY = 50;
const STORAGE_KEY = 'ai-assistant-history';

export class MemoryService {
  private history: ConversationMessage[] = [];

  constructor() {
    this.loadHistory();
  }

  addMessage(role: 'user' | 'assistant', content: string): void {
    this.history.push({
      role,
      content,
      timestamp: Date.now(),
    });

    if (this.history.length > MAX_HISTORY) {
      this.history.shift();
    }

    this.saveHistory();
  }

  getHistory(): ConversationMessage[] {
    return this.history;
  }

  getContext(limit: number = 10): string {
    return this.history
      .slice(-limit)
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
  }

  clearHistory(): void {
    this.history = [];
    localStorage.removeItem(STORAGE_KEY);
  }

  private saveHistory(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }

  private loadHistory(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.history = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  }
}