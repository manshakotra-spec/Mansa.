export interface ParsedCommand {
  type: 'workflow' | 'node' | 'query' | 'unknown';
  action: string;
  params: Record<string, any>;
  raw: string;
}

export class CommandParser {
  private static WORKFLOW_PATTERN = /^(create|update|delete|run)\s+workflow\s+(.+)$/i;
  private static NODE_PATTERN = /^(add|remove|configure)\s+node\s+(.+)$/i;
  private static QUERY_PATTERN = /^(find|list|search)\s+(.+)$/i;

  static parse(input: string): ParsedCommand {
    const trimmed = input.trim();

    // Try to match workflow commands
    const workflowMatch = trimmed.match(this.WORKFLOW_PATTERN);
    if (workflowMatch) {
      return {
        type: 'workflow',
        action: workflowMatch[1].toLowerCase(),
        params: { name: workflowMatch[2] },
        raw: trimmed,
      };
    }

    // Try to match node commands
    const nodeMatch = trimmed.match(this.NODE_PATTERN);
    if (nodeMatch) {
      return {
        type: 'node',
        action: nodeMatch[1].toLowerCase(),
        params: { nodeType: nodeMatch[2] },
        raw: trimmed,
      };
    }

    // Try to match query commands
    const queryMatch = trimmed.match(this.QUERY_PATTERN);
    if (queryMatch) {
      return {
        type: 'query',
        action: queryMatch[1].toLowerCase(),
        params: { query: queryMatch[2] },
        raw: trimmed,
      };
    }

    // Default to unknown
    return {
      type: 'unknown',
      action: 'query',
      params: { input: trimmed },
      raw: trimmed,
    };
  }

  static validate(command: ParsedCommand): boolean {
    switch (command.type) {
      case 'workflow':
        return ['create', 'update', 'delete', 'run'].includes(command.action);
      case 'node':
        return ['add', 'remove', 'configure'].includes(command.action);
      case 'query':
        return ['find', 'list', 'search'].includes(command.action);
      default:
        return true;
    }
  }
}