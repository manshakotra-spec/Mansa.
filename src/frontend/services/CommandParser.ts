export interface ParsedCommand {
  type: 'workflow' | 'node' | 'integration' | 'execution' | 'query' | 'unknown'
  action: string
  params: Record<string, any>
  raw: string
}

export class CommandParser {
  private static WORKFLOW_PATTERN = /^(create|update|delete|run|list)\s+workflow\s+(.+)$/i
  private static NODE_PATTERN = /^(add|remove|configure|list)\s+node\s+(.+)$/i
  private static INTEGRATION_PATTERN = /^(connect|add|remove)\s+(integration|connector)\s+(.+)$/i
  private static QUERY_PATTERN = /^(find|list|search|show)\s+(.+)$/i

  static parse(input: string): ParsedCommand {
    const trimmed = input.trim()

    // Try workflow commands
    const workflowMatch = trimmed.match(this.WORKFLOW_PATTERN)
    if (workflowMatch) {
      return {
        type: 'workflow',
        action: workflowMatch[1].toLowerCase(),
        params: { name: workflowMatch[2] },
        raw: trimmed,
      }
    }

    // Try node commands
    const nodeMatch = trimmed.match(this.NODE_PATTERN)
    if (nodeMatch) {
      return {
        type: 'node',
        action: nodeMatch[1].toLowerCase(),
        params: { nodeType: nodeMatch[2] },
        raw: trimmed,
      }
    }

    // Try integration commands
    const integrationMatch = trimmed.match(this.INTEGRATION_PATTERN)
    if (integrationMatch) {
      return {
        type: 'integration',
        action: integrationMatch[1].toLowerCase(),
        params: { name: integrationMatch[3] },
        raw: trimmed,
      }
    }

    // Try query commands
    const queryMatch = trimmed.match(this.QUERY_PATTERN)
    if (queryMatch) {
      return {
        type: 'query',
        action: queryMatch[1].toLowerCase(),
        params: { query: queryMatch[2] },
        raw: trimmed,
      }
    }

    // Default to unknown
    return {
      type: 'unknown',
      action: 'query',
      params: { input: trimmed },
      raw: trimmed,
    }
  }

  static validate(command: ParsedCommand): boolean {
    switch (command.type) {
      case 'workflow':
        return ['create', 'update', 'delete', 'run', 'list'].includes(command.action)
      case 'node':
        return ['add', 'remove', 'configure', 'list'].includes(command.action)
      case 'integration':
        return ['connect', 'add', 'remove'].includes(command.action)
      case 'query':
        return ['find', 'list', 'search', 'show'].includes(command.action)
      default:
        return true
    }
  }
}
